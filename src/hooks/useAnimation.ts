import { useState, useRef, useEffect } from "react";

interface AnimationState {
  spinning: boolean;
  angle: number;
  result: string | null;  // NULL means no result yet
}

interface UseAnimation {
  state: AnimationState;  // Current state of the animation
  resultSpin: () => void; // Spin the wheel to show the result
  startIndefiniteSpin: () => void;  // Start spinning indefinitely
  stopIndefiniteSpin: () => void;   // Stop spinning indefinitely
}

const useAnimation = (
  segments: string[],
  duration: number = 7000,
): UseAnimation => {
  const [state, setState] = useState<AnimationState>({
    spinning: false,
    angle: 0,
    result: null,
  });

  const timeoutRef = useRef<number | null>(null);

  const resultSpin = () => {
    setState((prevState) => ({
      ...prevState,
      spinning: true,
    }));

    const newAngle =
      state.angle +
      Math.floor(Math.random() * 360) +
      360 * 7; // Spin at least 7 full rotations from current angle
    setState((prevState) => ({
      ...prevState,
      angle: newAngle,
    }));

    timeoutRef.current = window.setTimeout(() => {
      const finalAngle = newAngle % 360;
      const pointerAngle = 290; // Angle of the pointer at the top center of the circle (assuming 0 degrees is at the 2 o'clock position)
      const segmentAngle = 360 / segments.length;
      // Calculate the segment index based on the angle difference from the pointer
      let index = Math.floor(
        ((360 - (finalAngle - pointerAngle)) % 360) / segmentAngle
      );
      if (index < 0) {
        index += segments.length;
      }
      setState({
        spinning: false,
        angle: newAngle,
        result: segments[index],
      });
    }, duration);
  };

  const startIndefiniteSpin = () => {
    setState((prevState) => ({
      ...prevState,
      spinning: true,
    }));

    const animate = () => {
      setState((prevState) => ({
        ...prevState,
        angle: prevState.angle + 10,
      }));

      timeoutRef.current = window.setTimeout(animate, 16); // Equivalent to ~60 FPS
    };

    animate();
  };

  const stopIndefiniteSpin = () => {
    setState((prevState) => ({
      ...prevState,
      spinning: false,
    }));

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { state, resultSpin, startIndefiniteSpin, stopIndefiniteSpin };
};

export default useAnimation;