import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./SpinnerApp.css";
import { useAccount, useConnect } from "wagmi";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import useAnimation from "../hooks/useAnimation";

const segments = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍍", "🍓", "🍌"];

export function SpinnerApp() {
  const [state, spin, startIndefiniteSpin, stopIndefiniteSpin] = useAnimation(segments);
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const { sendTransaction, isPending, isSuccess} = useSendTransaction();

  useEffect(() => {
    if (isPending) {
      startIndefiniteSpin();
    } else if (isSuccess) {
      stopIndefiniteSpin();
      if (state.spinning) {
        spin();
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="App">
      <div className="wheel-container">
        <motion.div
          className="wheel"
          animate={{ rotate: state.angle }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {segments.map((segment, index) => (
            <div
              key={index}
              className="segment"
              style={{
                transform: `rotate(${index * (360 / segments.length)}deg) translate(100%) rotate(${360 /
                  segments.length /
                  2}deg)`,
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
      <button onClick={spin} disabled={state.spinning}>
        {state.spinning ? "Spinning..." : "Spin"}
      </button>
      <br />
      {isConnected ? (
        <button
          onClick={() => {
            startIndefiniteSpin();
            sendTransaction({
              to: "0x924aeEe87946035bD4Eec32513ed890a33EcB8E3",
              value: parseEther("0.01"),
            });
          }}
        >
          Send Tx
        </button>
      ) : (
        <button onClick={() => connect({ connector: connectors[0] })}>
          Connect
        </button>
      )}
      <br />
      {state.result && <div className="result">Result: {state.result}</div>}
    </div>
  );
}

export default SpinnerApp;