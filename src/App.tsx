import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const segments = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍍', '🍓', '🍌'];

const App: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    setSpinning(true);
    const newAngle = angle + Math.floor(Math.random() * 360) + 360 * 5; // Spin at least 5 full rotations from current angle
    setAngle(newAngle);
    setTimeout(() => {
      setSpinning(false);
      const finalAngle = newAngle % 360;
      const pointerAngle = 270; // Angle of the pointer at the top center of the circle (assuming 0 degrees is at the 3 o'clock position)
      const segmentAngle = 360 / segments.length;
      // Calculate the segment index based on the angle difference from the pointer
      let index = Math.floor((360 - (finalAngle - pointerAngle)) % 360 / segmentAngle);
      if (index < 0) {
        index += segments.length;
      }
      setResult(segments[index]);
    }, 5000); // Match the duration in the animation
  };

  return (
    <div className="App">
      <div className="wheel-container">
        <motion.div
          className="wheel"
          animate={{ rotate: angle }}
          transition={{ duration: 5, ease: 'easeOut' }}
        >
          {segments.map((segment, index) => (
            <div
              key={index}
              className="segment"
              style={{
                transform: `rotate(${index * (360 / segments.length)}deg) translate(100%) rotate(${360 / segments.length / 2}deg)`,
              }}
            >
              <p className="emoji">{segment}</p>
            </div>
          ))}
        </motion.div>
        <div className="pointer">▼</div>
      </div>
      <br />
      <br />
      <button onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>
      <br />
      {result && <div className="result">Result: {result}</div>}
    </div>
  );
};

export default App;