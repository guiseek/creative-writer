export const is = {
  string(value: unknown): value is string {
    return typeof value === 'string'
  },
  number(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value)
  },
  date(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime())
  },
  boolean(value: unknown): value is boolean | 'true' | 'false' {
    const possibilities = ['true', 'false', true, false]
    const isPossibility = possibilities.some(
      (possibility) => possibility === value,
    )
    return typeof value === 'boolean' || isPossibility
  },
}
