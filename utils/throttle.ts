export default <T extends (...args: any[]) => any>(
  callback: T,
  limit = 33.4
) => {
  type R = ReturnType<T>;

  let waiting = false;
  let result: R;

  return (...args: Parameters<T>): R => {
    if (waiting) return result;
    result = callback(...args);
    waiting = true;
    setTimeout(() => (waiting = false), limit);
    return result;
  };
};
