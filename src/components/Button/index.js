import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {string} from 'prop-types';

import styles from './styles';

const Button = ({text, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
    <Text>{text}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  text: string.isRequired,
};

export default Button;
