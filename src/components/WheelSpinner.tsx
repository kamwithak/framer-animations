import React, { useEffect, ReactNode} from "react";
import { parseEther } from "viem";
import { useAccount, useConnect } from "wagmi";
import { useSendTransaction } from "wagmi";
import useWheelSpinner from "../hooks/useWheelSpinner";

import "./WheelSpinner.css";

const SEGMENTS = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍍", "🍓", "🍌"];

const WheelSpinner: React.FC = () => {
  const { state, resultSpin, startIndefiniteSpin, stopIndefiniteSpin } =
  useWheelSpinner(SEGMENTS);

  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { sendTransaction, isPending, isSuccess, isError } =
    useSendTransaction();

  useEffect(() => {
    if (isPending) {
      // If tx pending, start the indefinite spin
      startIndefiniteSpin();
    } else if (isSuccess) {
      // If tx confirmed, invoke the resulting spin
      resultSpin('easeOut');
    } else if (isError) {
      // If tx rejected, stop the indefinite spin
      stopIndefiniteSpin();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  return (
    <div className="App">
      <Wheel currentAngle={state.angle} segments={SEGMENTS} />
      <div className="cta">
        <Button onClick={() => resultSpin('easeInOut')} disabled={state.spinning}>
          {state.spinning ? "Spinning..." : "Free Spin"}
        </Button>
        {isConnected ? (
          <Button onClick={() => sendTransaction({
            to: "0x924aeEe87946035bD4Eec32513ed890a33EcB8E3",
            value: parseEther("0.01"),
          })} disabled={state.spinning}>
            {state.spinning ? "Spinning..." : "Paid Spin"}
          </Button>
        ) : (
          <Button onClick={() => connect({ connector: connectors[0] })} disabled={state.spinning}>
            Connect Wallet
          </Button>
        )}
      </div>
      <Result result={state.result} />
    </div>
  );
};

const Wheel: React.FC<{ currentAngle: number; segments: string[] }> = ({ currentAngle, segments }) => {
  return (
    <div className="wheel-container">
      <div className="wheel" style={{ transform: `rotate(${currentAngle}deg)` }}>
        {segments.map((segment, index) => (
          <div
            key={index}
            className="segment"
            style={{
              transform: `rotate(${index *  360 / SEGMENTS.length}deg) translate(100%)`,
            }}
          >
            <span className="emoji">{segment}</span>
          </div>
        ))}
      </div>
      <div className="pointer">▼</div>
    </div>
  );
};

const Button: React.FC<{ onClick: () => void; disabled: boolean; children: ReactNode }> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

const Result: React.FC<{ result: string | null }> = ({ result }) => {
  if (!result) {
    return null;
  }
  return <div className="result">Result: {result}</div>;
}


export default WheelSpinner;
