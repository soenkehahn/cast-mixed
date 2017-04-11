// @flow

import _ from 'lodash'

export function cast<A>(sample: A, input: mixed): ?A {
  switch (typeof(sample)) {
    case 'number':
      if (typeof(input) === 'number') {
        return unsafeCast(input)
      } else {
        return null
      }
    case 'string':
      if (typeof(input) === 'string') {
        return unsafeCast(input)
      } else {
        return null
      }
    case 'object':
      if (sample === null) {
        throw new Error('invalid sample: null')
      } else if (typeof(input) === 'object' && input !== null) {
        return castToObject(sample, input)
      } else {
        return null
      }
    case 'undefined':
      throw new Error('invalid sample: undefined')
    default:
      const s: any = sample
      throw new Error('invalid sample: ' + s.toString())
  }
}

function unsafeCast<A, B>(a: A): B {
  const r: any = a
  return r
}

function castToObject<A>(sample: {} & A, input: {}): ?A {
  let canCast = true
  _.forEach(sample, (value, key) => {
    if (input.hasOwnProperty(key)) {
      let castField = cast(value, input[key])
      if (castField === null) {
        canCast = false
      }
    } else {
      canCast = false
    }
  })
  if (canCast) {
    return unsafeCast(input)
  } else {
    return null
  }
}
