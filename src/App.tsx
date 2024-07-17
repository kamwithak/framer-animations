import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAnimation from "./hooks/useAnimation";
import "./App.css";

const segments = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍍", "🍓", "🍌"];

const App: React.FC = () => {
  const [animationState, spin, startSpin, stopSpin, scope] = useAnimation(segments);

  // Simulate pending state (you would replace this with actual logic from your sendTransaction)
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (isPending) {
      startSpin();
    } else {
      stopSpin();
      // spin(); // Spin to show the result after stopping the indefinite spin
    }
  }, [isPending]);

  const handleSendTransaction = () => {
    setIsPending(true);
    // Simulate a transaction (you would replace this with actual logic)
    setTimeout(() => {
      setIsPending(false);
    }, 5000); // Simulate a 5 second transaction
  };

  return (
    <div className="App">
      <div className="wheel-container">
        <motion.div
          className="wheel"
          ref={scope} // Ensure the scope reference is correctly applied here
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
      <button onClick={handleSendTransaction}>Send Tx</button>
      <br />
      {animationState.result && (
        <div className="result">Result: {animationState.result}</div>
      )}
    </div>
  );
};

export default App;