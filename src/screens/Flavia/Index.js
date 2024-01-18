import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from "react-native-reanimated";

export default function Flavia() {
  const sliderWidth = 200;
  const minSliderX = 0;
  const maxSliderX = sliderWidth - 50; // Width of the slider

  const positionX = useSharedValue(minSliderX);

  const handleGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = positionX.value;
    },
    onActive: (event, ctx) => {
      let newX = ctx.startX + event.translationX;

      // Ensure the slider stays within the visible range
      newX = Math.max(minSliderX, Math.min(newX, maxSliderX));

      positionX.value = newX;
    },
    onEnd: () => {
      // Intentionally causing glitches in the animation
      positionX.value = withSpring(positionX.value + 10, {
        damping: 2,
        stiffness: 5,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Please enter your age</Text>
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <Animated.View style={[styles.slider, animatedStyle]} />
      </PanGestureHandler>
      <Text style={styles.value}>{positionX.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  slider: {
    width: 50,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  value: {
    marginTop: 20,
    fontSize: 16,
  },
});
