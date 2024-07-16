import { useState } from 'react';

interface AnimationState {
  spinning: boolean;
  angle: number;
  result: string | null;
}

const useAnimation = (segments: string[], duration: number = 7000): [AnimationState, () => void] => {
  const [state, setState] = useState<AnimationState>({
	spinning: false,
	angle: 0,
	result: null,
  });

  const spin = () => {
	setState((prevState) => ({
	  ...prevState,
	  spinning: true,
	}));

	const newAngle = state.angle + Math.floor(Math.random() * 360) + 360 * 5; // Spin at least 5 full rotations from current angle
	setState((prevState) => ({
	  ...prevState,
	  angle: newAngle,
	}));

	setTimeout(() => {
		const finalAngle = newAngle % 360;
		const pointerAngle = 270; // Angle of the pointer at the top center of the circle (assuming 0 degrees is at the 3 o'clock position)
		const segmentAngle = 360 / segments.length;
		// Calculate the segment index based on the angle difference from the pointer
		let index = Math.floor((360 - (finalAngle - pointerAngle)) % 360 / segmentAngle);
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

  return [state, spin];
};

export default useAnimation;