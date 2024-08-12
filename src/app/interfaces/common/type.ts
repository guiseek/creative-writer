export interface Type<T> extends Function {
  new (...params: any[]): T
}
