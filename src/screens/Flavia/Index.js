import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export const Flavia = () => {
  const sliderWidth = 200;
  const minSliderX = 0;
  const maxSliderX = sliderWidth - 50; // Width of the slider

  const positionX = useSharedValue(minSliderX);

  const handleGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = positionX.value;
    },
    onActive: (event, ctx) => {
      positionX.value = ctx.startX + event.translationX;

      // Ensure the slider stays within the visible range
      positionX.value = Math.max(
        minSliderX,
        Math.min(positionX.value, maxSliderX)
      );
    },
    onEnd: (event) => {
      // Intentionally causing glitches in the animation
      if (event.translationX < 0) {
        positionX.value = withSpring(positionX.value - 20, {
          damping: 2,
          stiffness: 5,
        });
      } else {
        positionX.value = withSpring(positionX.value + 20, {
          damping: 2,
          stiffness: 5,
        });
      }
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
      <View style={styles.route}>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <Animated.View style={[styles.slider, animatedStyle]} />
        </PanGestureHandler>
      </View>
      <Text style={styles.value}>{positionX.value}</Text>
    </View>
  );
};

export default Flavia;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginBottom: 30,
    fontSize: 24,
    fontWeight: "bold",
  },
  route: {
    borderWidth: 1,
    borderColor: "gray",
    width: 200,
    height: 5,
    backgroundColor: "gray",
  },
  slider: {
    width: 20,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10,
    marginTop: 20,
    position: "absolute",
    top: -28,
  },
  value: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});
