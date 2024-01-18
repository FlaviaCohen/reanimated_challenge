import MovingKeyboard from '../../components/MovingKeyboard';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const WhatsYourName = () => {
  const [name, setName] = useState<string>('');

  const onLetterPressed = (letter: string) => {
    setName(prev => prev + letter);
  };
  const onDeletePress = () => {
    setName(prev => prev.slice(0, prev.length - 1));
  };

  const onSpacePressed = () => {
    setName(prev => prev + ' ');
  };

  return (
    <View>
      <MovingKeyboard
        onPress={onLetterPressed}
        onDeletePress={onDeletePress}
        onSpacePressed={onSpacePressed}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.nameLabel}>My name is:</Text>
        <Text style={styles.nameInput}>{name}</Text>
      </View>
    </View>
  );
};

export default WhatsYourName;
