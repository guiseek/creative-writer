export const entries = <T extends {}, K extends keyof T>(value: T) => {
  return Object.entries(value) as [K, T[K]][]
}
