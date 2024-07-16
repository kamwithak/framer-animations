import React from "react";
import { motion } from "framer-motion";
import useAnimation from "./hooks/useAnimation";
import "./App.css";

const segments = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍍", "🍓", "🍌"];

const App: React.FC = () => {
  const [animationState, spin] = useAnimation(segments);

  return (
    <div className="App">
      <div className="wheel-container">
        <motion.div
          className="wheel"
          animate={{ rotate: animationState.angle }}
          transition={{ duration: 7, ease: "easeOut" }}
        >
          {segments.map((segment, index) => (
            <div
              key={index}
              className="segment"
              style={{
                transform: `rotate(${index * (360 / segments.length)}deg) translate(100%) rotate(${360 / segments.length / 2}deg)`,
              }}
            >
              <span className="emoji">{segment}</span>
            </div>
          ))}
        </motion.div>
        <div className="pointer">▼</div>
      </div>
      <br />
      <br />
      <button onClick={spin} disabled={animationState.spinning}>
        {animationState.spinning ? "Spinning..." : "Spin"}
      </button>
      <br />
      {animationState.result && (
        <div className="result">Result: {animationState.result}</div>
      )}
    </div>
  );
};

export default App;
