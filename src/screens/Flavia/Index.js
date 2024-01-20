import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

export const Flavia = () => {
  const sliderWidth = 200;
  const minSliderX = "0";
  const maxSliderX = sliderWidth - 100; // Width of the slider
  const ctx = useSharedValue("0");

  const positionX = useSharedValue(minSliderX);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      ctx.value = positionX.value;
    })
    .onUpdate((event) => {
      positionX.value = Math.trunc(
        Number(ctx.value) + event.translationX
      ).toString();
      // Ensure the slider stays within the visible range
      positionX.value = Math.trunc(
        Math.max(
          Number(minSliderX),
          Math.min(Number(positionX.value), maxSliderX)
        )
      ).toString();
    })
    .onEnd((event) => {
      if (event.translationX < 0) {
        positionX.value = withSpring(
          Math.trunc(Number(positionX.value) - 30).toString(),
          {
            mass: 1,
            damping: 7,
            stiffness: 200,
            restSpeedThreshold: 72,
          }
        );
      } else {
        positionX.value = withSpring(
          Math.trunc(Number(positionX.value) + 30).toString(),
          {
            mass: 1,
            damping: 7,
            stiffness: 200,
            restSpeedThreshold: 72,
          }
        );
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: Number(positionX.value) }],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Please enter your age</Text>
      <View style={styles.route}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.slider, animatedStyle]} />
        </GestureDetector>
      </View>
      <ReText text={positionX} style={styles.value} />
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
