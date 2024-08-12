export const timeout = (fn: VoidFunction, ms = 100) => {
  const ref = setTimeout(fn, ms)
  return () => clearTimeout(ref)
}
