import React, { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { motion } from "framer-motion";
import useAnimation from "../hooks/useAnimation";

import "./SpinnerApp.css";

const segments = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍍", "🍓", "🍌"];

const SpinnerApp: React.FC = () => {
  const { state, resultSpin, startIndefiniteSpin, stopIndefiniteSpin }= useAnimation(segments);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { sendTransaction, isPending, isSuccess, isError } = useSendTransaction();

  useEffect(() => {
    if (isPending) {
      console.log('Start the indefinite spin')
      startIndefiniteSpin();
    } else if (isSuccess) {
      console.log('Stop the indefinite spin')
      stopIndefiniteSpin();
      console.log('Start the result spin')
      resultSpin();
    } else if (isError) { // If tx rejected, stop the spin
      console.log('Stop the indefinite spin')
      stopIndefiniteSpin();
    }
  }, [isPending]);

  const handleSendTransaction = () => {
    if (isConnected) {
      sendTransaction({
        to: '0x924aeEe87946035bD4Eec32513ed890a33EcB8E3',
        value: parseEther('0.01'),
      });
    } else {
      connect({ connector: connectors[0] });
    }
  };

  return (
    <div className="App">
      <div className="wheel-container">
        <motion.div
          className="wheel"
          animate={{ rotate: state.angle }}
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
      <button onClick={resultSpin} disabled={state.spinning}>
        {state.spinning ? "Spinning..." : "Free Spin"}
      </button>
      <br />
      <button onClick={handleSendTransaction} disabled={state.spinning}>
        {isConnected ? 'Paid Spin' : 'Connect'}
      </button>
      <br />
      {state.result && (
        <div className="result">Result: {state.result}</div>
      )}
    </div>
  );
};

export default SpinnerApp;