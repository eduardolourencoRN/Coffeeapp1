const fetchProducts = async () => {
    try {
        const response = await fetch('http://192.168.100.129:3000/getProducts');

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        console.log(data.products);
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export default fetchProducts;
