export function getDelayedPromise(ms: number = 1000) {
  return new Promise((res) => setTimeout(res, ms));
}
