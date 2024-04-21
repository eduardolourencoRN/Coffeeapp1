const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'CoffeeApp',
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Chave secreta para assinar tokens JWT
const SEU_SEGREDO =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjQ2MDczMCwiaWF0IjoxNzA2NDYwNzMwfQ.bGshfU4oDTgUE5U6TMtK4RXc8UM87GKWKr-8mfZ03ig';

// Função para gerar token JWT
function generateToken(user) {
    const token = jwt.sign({ userId: user.id }, SEU_SEGREDO, {
        expiresIn: '1w',
    });
    return 'Bearer ' + token; // Adiciona o prefixo "Bearer" ao token JWT
}

app.use(bodyParser.json());

// Configuração de armazenamento para os uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define o diretório de destino para os uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Usa o nome original do arquivo
    },
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

const profileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profile_images/'); // Define o diretório de destino para as imagens de perfil
    },
    filename: function (req, file, cb) {
        // Obtenha a extensão do arquivo
        const ext = file.originalname.split('.').pop();
        // Gere um nome único usando o timestamp atual e adicionando a extensão
        const uniqueFilename =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + '.' + ext;
        cb(null, uniqueFilename);
    },
});

// Middleware para fazer o upload de imagens de perfil
const uploadProfileImage = multer({ storage: profileImageStorage });

// Rota para servir as imagens de perfil estáticas
app.use('/profile_images', express.static('profile_images'));

// Rota para adicionar usuário
// Rota para adicionar usuário com imagem de perfil
app.post(
    '/addUser',
    uploadProfileImage.single('profileImage'),
    async (req, res) => {
        const { username, password, cpf, telefone, email } = req.body;
        const profileImage = req.file.path; // Caminho do arquivo de imagem de perfil

        try {
            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10); // 10 é o custo do hash

            // Criação do novo usuário com os campos adicionais
            const newUser = {
                username,
                password: hashedPassword,
                cpf,
                telefone,
                email,
                profileImage, // Adiciona o caminho da imagem de perfil ao novo usuário
            };

            // Insere o novo usuário no banco de dados
            connection.query(
                'INSERT INTO users SET ?',
                newUser,
                (error, results) => {
                    if (error) {
                        console.error('Erro ao adicionar usuário:', error);
                        res.status(500).json({
                            message: 'Error adding user',
                            error: error.message,
                        });
                        return;
                    }
                    // Retorna uma resposta com status 201 e o novo usuário criado
                    res.status(201).json({
                        message: 'User added successfully',
                        user: newUser,
                    });
                },
            );
        } catch (error) {
            // Retorna uma resposta de erro com status 500 se houver algum erro durante o processo
            res.status(500).json({
                message: 'Error adding user',
                error: error.message,
            });
        }
    },
);

// Rota para fazer login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        connection.query(
            'SELECT * FROM users WHERE username = ?',
            [username],
            async (error, results) => {
                if (error) {
                    console.error('Erro ao buscar usuário:', error);
                    return res.status(500).json({
                        message: 'Error searching user',
                        error: error.message,
                    });
                }

                if (results.length === 0) {
                    return res
                        .status(401)
                        .json({ message: 'Invalid credentials' });
                }

                const user = results[0];
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    const token = generateToken(user);
                    res.status(200).json({
                        message: 'Login successful',
                        user: {
                            id: user.id,
                            username: user.username,
                            cpf: user.cpf,
                            telefone: user.telefone,
                            email: user.email,
                            profileImage: user.profileImage, // Inclui o caminho da imagem de perfil
                        },
                        token,
                    });
                    console.log('Login completed');
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            },
        );
    } catch (error) {
        res.status(500).json({
            message: 'Error comparing passwords',
            error: error.message,
        });
    }
});

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], SEU_SEGREDO, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId; // Adiciona o ID do usuário decodificado à requisição
        next();
    });
}
app.post(
    '/addProduct',
    verifyToken,
    upload.single('productImage'),
    (req, res) => {
        const { userId, productName, price, stock, description, categoryId } =
            req.body;
        const productImage = req.file.path; // Caminho do arquivo de imagem

        // Insira o novo produto no banco de dados
        connection.query(
            'INSERT INTO products (userId, productName, price, stock, description, categoryId, productImage) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                userId,
                productName,
                price,
                stock,
                description,
                categoryId,
                productImage,
            ],
            (error, results) => {
                if (error) {
                    console.error('Erro ao adicionar produto:', error);
                    return res.status(500).json({
                        message: 'Error adding product',
                        error: error.message,
                    });
                }
                // Retorna uma resposta com status 201 e o novo produto criado
                const newProductId = results.insertId;
                const newProduct = {
                    id: newProductId,
                    userId,
                    productName,
                    price,
                    stock,
                    description,
                    categoryId,
                    productImage, // Retorna o caminho da imagem na resposta
                };

                res.status(201).json({
                    message: 'Product added successfully',
                    product: newProduct,
                });
            },
        );
    },
);

// Rota para atualizar um produto
app.put('/updateProduct/:productId', verifyToken, (req, res) => {
    const { userId } = req.body;
    const productId = req.params.productId;
    const { productName, price, stock, description, categoryId } = req.body;

    // Verifica se o usuário é o dono do produto
    connection.query(
        'SELECT * FROM products WHERE id = ? AND userId = ?',
        [productId, userId],
        (error, results) => {
            if (error) {
                console.error('Erro ao buscar produto:', error);
                return res.status(500).json({
                    message: 'Error searching product',
                    error: error.message,
                });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Atualiza o produto no banco de dados
            connection.query(
                'UPDATE products SET productName = ?, price = ?, stock = ?, description = ?, categoryId = ? WHERE id = ?',
                [productName, price, stock, description, categoryId, productId],
                (error, results) => {
                    if (error) {
                        console.error('Erro ao atualizar produto:', error);
                        return res.status(500).json({
                            message: 'Error updating product',
                            error: error.message,
                        });
                    }
                    // Retorna uma resposta com status 200 e o produto atualizado
                    const updatedProduct = {
                        id: productId,
                        userId,
                        productName,
                        price,
                        stock,
                        description,
                        categoryId,
                    };
                    res.status(200).json({
                        message: 'Product updated successfully',
                        product: updatedProduct,
                    });
                },
            );
        },
    );
});

app.delete('/deleteProduct/:productId', verifyToken, (req, res) => {
    const { productId } = req.params;
    const userId = req.userId;

    connection.query(
        'DELETE FROM products WHERE id=? AND userId=?',
        [productId, userId],
        (error, results) => {
            if (error) {
                console.error('Erro ao excluir produto:', error);
                return res.status(500).json({
                    message: 'Error deleting product',
                    error: error.message,
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        },
    );
});

// Rota para obter todos os produtos
// Rota para obter todos os produtos com informações da categoria
app.get('/getProducts', (req, res) => {
    // Obter o limite de produtos do parâmetro de consulta da URL (query parameter)
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    // Construir a consulta SQL baseada no limite opcional
    let query = `
        SELECT p.*, c.name AS categoryName 
        FROM products p 
        INNER JOIN categories c ON p.categoryId = c.id
    `;

    // Adicionar o limite à consulta se o parâmetro estiver presente e for um número válido
    if (limit && !isNaN(limit)) {
        query += `LIMIT ${limit}`;
    }

    // Executar a consulta
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar produtos:', error);
            return res.status(500).json({
                message: 'Error fetching products',
                error: error.message,
            });
        }
        console.log(results); // Imprime os resultados no console do servidor
        res.status(200).json({ products: results }); // Retorna todos os produtos com informações da categoria
    });
});

// Rota para obter todos os produtos do usuário logado
app.get('/myProducts', verifyToken, (req, res) => {
    const userId = req.userId;

    // Obtém todos os produtos do banco de dados associados ao usuário logado
    connection.query(
        'SELECT * FROM products WHERE userId = ?',
        [userId],
        (error, results) => {
            if (error) {
                console.error('Erro ao buscar produtos do usuário:', error);
                return res.status(500).json({
                    message: 'Error fetching user products',
                    error: error.message,
                });
            }
            res.status(200).json({ products: results }); // Retorna apenas os produtos do usuário logado
        },
    );
});

// Rota para adicionar uma nova categoria
app.post('/addCategory', (req, res) => {
    const { categoryName } = req.body;

    // Insere a nova categoria no banco de dados
    connection.query(
        'INSERT INTO categories (name) VALUES (?)',
        [categoryName],
        (error, results) => {
            if (error) {
                console.error('Erro ao adicionar categoria:', error);
                return res.status(500).json({
                    message: 'Error adding category',
                    error: error.message,
                });
            }
            // Retorna uma resposta com status 201 e a nova categoria criada
            const newCategoryId = results.insertId;
            const newCategory = {
                id: newCategoryId,
                categoryName,
            };
            res.status(201).json({
                message: 'Category added successfully',
                category: newCategory,
            });
        },
    );
});

// Rota para obter todas as categorias
app.get('/categories', (req, res) => {
    // Seleciona todas as categorias do banco de dados
    connection.query('SELECT * FROM categories', (error, results) => {
        if (error) {
            console.error('Erro ao buscar categorias:', error);
            return res.status(500).json({
                message: 'Error fetching categories',
                error: error.message,
            });
        }
        res.status(200).json({ categories: results }); // Retorna todas as categorias
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
