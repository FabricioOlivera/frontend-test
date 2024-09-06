import useAnimatedCounter from "@/hooks/useAnimatedCounter";

type AnimatedBalanceCounterProps = {
  from: number;
  to: number;
  amount: number;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function AnimatedBalanceCounter({
  from,
  to,
  amount,
  ...props
}: AnimatedBalanceCounterProps) {
  const number = useAnimatedCounter({ from, to, amount });

  return <span {...props}>$ {Intl.NumberFormat("en-US").format(number)}</span>;
}
