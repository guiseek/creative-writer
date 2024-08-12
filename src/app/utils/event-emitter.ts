import {Callback} from '@interfaces/callback'

export class EventEmitter<T> {
  #subs = new Map()

  on<K extends keyof T>(key: K, callback: Callback<T[K]>) {
    const subs = this.#getSubs(key)
    this.#subs.set(key, subs.add(callback))
    return () => subs.delete(callback)
  }

  off<K extends keyof T>(key: K, callback: Callback<T[K]>) {
    return this.#getSubs(key).delete(callback)
  }

  emit<K extends keyof T>(key: K, value: T[K]) {
    const subs = this.#getSubs(key)
    for (const sub of subs) sub(value)
  }

  #getSubs<K extends keyof T>(key: K): Set<Callback<T[K]>> {
    return this.#subs.get(key) ?? new Set()
  }
}
