export default function mockedDelay(ms: number) {
  new Promise((resolve) => setTimeout(resolve, ms));
}
