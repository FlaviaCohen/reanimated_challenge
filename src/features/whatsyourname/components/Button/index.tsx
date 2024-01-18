import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ButtonProps} from './types';
import styles from './styles';

const Button: React.FC<ButtonProps> = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
