import { useEffect, useState, useRef } from "react";

type useAnimatedCounterProps = {
  from: number;
  to: number;
  amount: number;
  minDelay?: number;
  maxDelay?: number;
};

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

export default function useAnimatedCounter({
  from,
  to,
  amount,
  minDelay = 10, // Fastest delay
  maxDelay = 1000, // Slowest delay
}: useAnimatedCounterProps) {
  const [number, setNumber] = useState(from);
  const requestRef = useRef<number | null>(null);

  const animate = () => {
    setNumber((prevNumber) => {
      const newNumber =
        prevNumber / to < 1 - amount
          ? Math.ceil(lerp(prevNumber, to, amount))
          : to;

      // Calculate proximity (closer to 0 means closer to `to`)
      const proximity = Math.abs(to - newNumber) / Math.abs(to - from);

      // Delay should increase as the number approaches `to`
      const dynamicDelay = lerp(maxDelay, minDelay, proximity);

      // If the number is close enough to the target, stop animating
      if (Math.abs(newNumber - to) < 0.01) {
        return to;
      } else {
        setTimeout(() => {
          requestRef.current = requestAnimationFrame(animate);
        }, dynamicDelay); // Dynamic delay increases closer to the target
        return newNumber;
      }
    });
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [from, to, amount, minDelay, maxDelay]); // Dependencies

  return number;
}
