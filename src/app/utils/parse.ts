import {PropValue} from '@interfaces/common'
import {is} from './is'

export const parse = <T>(value: PropValue) => {
  let parsed = value

  if (!!!value) {
    return null
  }

  if (is.boolean(value)) {
    parsed = value === 'true'
    return parsed
  }

  if (is.date(value)) {
    parsed = new Date(value.toString())
    return parsed
  }

  if (is.number(+value)) {
    parsed = +value
    return parsed
  }

  if (is.string(value)) {
    parsed = value
    return parsed
  }

  return parsed as T
}
