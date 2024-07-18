import { useState, useRef, useEffect } from 'react';
import { animate, Easing } from 'framer-motion';

interface WheelSpinnerState {
  spinning: boolean;
  angle: number;
  result: string | null;
}

interface UseWheelSpinner {
  state: WheelSpinnerState; // Current state of the animation
  resultSpin: (ease: Easing) => void; // Spin the wheel to show the result
  startIndefiniteSpin: () => void; // Start spinning the wheel
  stopIndefiniteSpin: () => void; // Stop spinning the wheel
}

const NUMBER_OF_LOOPS = 5;

const useWheelSpinner = (
  segments: string[],
  duration: number = 7000,
): UseWheelSpinner => {
  const [state, setState] = useState<WheelSpinnerState>({
    spinning: false,
    angle: 0,
    result: null,
  });

  const animationRef = useRef<any>(null); // Ref for the animation

  const resultSpin = (ease: Easing) => {
    console.log('Start the result spin');
  
    setState((prevState) => ({
      ...prevState,
      spinning: true,
    }));

    const newAngle = state.angle + Math.floor(Math.random() * 360) + 360 * NUMBER_OF_LOOPS;

    // Ensure any previous animation is stopped
    if (animationRef.current) {
      animationRef.current.stop();
    }

    animate(state.angle, newAngle, {
      duration: duration / 1000, // Convert duration to seconds
      ease,
      onUpdate: (latest) => {
        setState((prevState) => ({
          ...prevState,
          angle: latest,
        }));
      },
      onComplete: () => {
        const finalAngle = newAngle % 360;
        const pointerAngle = 290; // Angle of the pointer at the top center of the circle (assuming 0 degrees is at the 2 o'clock position)
        const segmentAngle = 360 / segments.length;
        // Calculate the segment index based on the angle difference from the pointer
        let index = Math.floor(
          ((360 - (finalAngle - pointerAngle)) % 360) / segmentAngle,
        );
        if (index < 0) {
          index += segments.length;
        }
        setState({
          spinning: false,
          angle: newAngle,
          result: segments[index],
        });
      },
    });
  };

  const startIndefiniteSpin = () => {
    console.log('Start the indefinite spin');
  
    setState((prevState) => ({
      ...prevState,
      spinning: true,
    }));

    // Ensure any previous animation is stopped
    if (animationRef.current) {
      animationRef.current.stop();
    }

    // Set up a continuous spinning animation
    animationRef.current = animate(state.angle, state.angle + 360 * NUMBER_OF_LOOPS, {
      duration: duration / 1000, // Convert duration to seconds
      ease: 'easeInOut', // Use easing for smooth acceleration and deceleration
      repeat: Infinity, // Repeat indefinitely
      onUpdate: (latest) => {
        setState((prevState) => ({
          ...prevState,
          angle: latest,
        }));
      },
    });
  };

  const stopIndefiniteSpin = () => {
    console.log('Stop the indefinite spin');
  
    if (animationRef.current) {
      animate(state.angle, state.angle + 360 * NUMBER_OF_LOOPS, {
        duration: duration / 1000, // Convert duration to seconds
        ease: 'easeOut', // Use easing for smooth deceleration
        onUpdate: (latest) => {
          setState((prevState) => ({
            ...prevState,
            angle: latest,
          }));
        },
        onComplete: () => {
          setState((prevState) => ({
            ...prevState,
            spinning: false,
          }));
          animationRef.current = null; // Clear the reference
        },
      });

      animationRef.current.stop(); // Stop the indefinite spinning
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  return {
    state,
    resultSpin,
    startIndefiniteSpin,
    stopIndefiniteSpin,
  };
};

export default useWheelSpinner;