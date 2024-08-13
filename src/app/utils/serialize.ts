import type {PropValue} from '@interfaces/common'
import {dataFromForm} from './data-from-form'
import {entries} from './iterators'
import {parse} from './parse'

export type FormValue = Record<string, PropValue>

export const serialize = <T extends object>(form: T | object): T => {
  const data = form instanceof HTMLFormElement ? dataFromForm<T>(form) : form
  return entries(data as FormValue).reduce((prev, [key, val]) => {
    return {...prev, [key]: parse(val as PropValue)}
  }, data) as T
}
