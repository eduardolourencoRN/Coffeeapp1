import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importe o ícone que você deseja usar
import styles from '../styles/styles';

function InfoProfileContainer({texto, onPress, style, icon}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.containerInfoProfiles, style]}>
        {icon && <Icon name={icon} size={20} color="#FFF" />}
        <Text style={styles.title}>{texto}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default InfoProfileContainer;
