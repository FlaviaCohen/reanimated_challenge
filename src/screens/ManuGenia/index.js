import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import styles from './styles';
import {SCREEN_WIDTH} from '../../constants/common';
import Button from '../../components/Button';

const emptyData = new Array(10).fill(new Array(10).fill(0));
const gridData = emptyData.map((column, rowIndex) =>
  column.map((_, columnIndex) => ({
    number: rowIndex * 10 + columnIndex + 1,
    x: 25 * (columnIndex + 1) + 10 * columnIndex,
    y: 25 * (rowIndex + 1) + 10 * rowIndex,
  })),
);

const getDistance = (x, y, newPoint) =>
  Math.sqrt(Math.pow(x - newPoint.x, 2) + Math.pow(y - newPoint.y, 2));

const ManuGenia = () => {
  const [selectedNumber, setSelectedNumber] = useState(1);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const selectedNumberAnim = useSharedValue(1);

  const getSelectedNumber = (translateXValue, translateYValue) => {
    const firstFilter = gridData.map(row => {
      const closest = row.reduce((a, b) =>
        getDistance(translateXValue, translateYValue, a) <
        getDistance(translateXValue, translateYValue, b)
          ? a
          : b,
      );

      return closest;
    });

    const {number: newSelectedNumber} = firstFilter.reduce((a, b) =>
      getDistance(translateXValue, translateYValue, a) <
      getDistance(translateXValue, translateYValue, b)
        ? a
        : b,
    );

    setSelectedNumber(newSelectedNumber);

    selectedNumberAnim.value = withTiming(newSelectedNumber, {
      duration: 1000,
    });

    return newSelectedNumber;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
        {
          translateY: translationY.value,
        },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: 'white',
    textAlign: 'center',
    fontSize: selectedNumberAnim.value,
    width: '100%',
  }));

  const moveLeft = () => {
    const min = 0;
    const max = translationX.value;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    translationX.value = withTiming(random, {duration: 1000});
  };

  const moveRight = () => {
    const min = translationX.value;
    const max = SCREEN_WIDTH - 75;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    translationX.value = withTiming(random, {duration: 1000});
  };

  const moveUp = () => {
    const min = 0;
    const max = translationY.value;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    translationY.value = withTiming(random, {duration: 1000});
  };

  const moveDown = () => {
    const min = translationY.value;
    const max = SCREEN_WIDTH - 75;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    translationY.value = withTiming(random, {duration: 1000});
  };

  useAnimatedReaction(
    () => translationX.value,
    translateXValue => {
      runOnJS(getSelectedNumber)(translateXValue + 25, translationY.value + 25);
    },
  );

  useAnimatedReaction(
    () => translationY.value,
    translateYValue => {
      runOnJS(getSelectedNumber)(translationX.value + 25, translateYValue + 25);
    },
  );

  return (
    <View style={styles.container}>
      {gridData.map(row => (
        <>
          {row.map(({number}) => (
            <View key={number} style={styles.square}>
              <Text>{number}</Text>
            </View>
          ))}
        </>
      ))}
      <Animated.View
        style={[styles.square, styles.filledSquare, animatedStyle]}
      />
      <Text style={styles.question}>How Old Are You?</Text>
      <Animated.Text style={animatedTextStyle}>{selectedNumber}</Animated.Text>
      <View style={styles.buttonsContainer}>
        <Button text="Up" onPress={moveUp} />
        <View style={styles.row}>
          <Button text="Left" onPress={moveLeft} style={styles.buttonLeft} />
          <Button text="Right" onPress={moveRight} style={styles.buttonRight} />
        </View>
        <Button text="Down" onPress={moveDown} />
      </View>
    </View>
  );
};

export default ManuGenia;
