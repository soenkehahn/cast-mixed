// @flow

import _ from 'lodash'

export function cast<A>(sample: A, input: mixed): ?A {
  if (hasSampleType(sample, input)) {
    return unsafeCast(input)
  } else {
    return null
  }
}

function unsafeCast<A, B>(a: A): B {
  const r: any = a
  return r
}

function hasSampleType<A>(sample: A, input: mixed): bool {
  switch (typeof(sample)) {
    case 'number':
      if (typeof(input) === 'number') {
        return true
      } else {
        return false
      }
    case 'string':
      if (typeof(input) === 'string') {
        return true
      } else {
        return false
      }
    case 'object':
      if (sample === null) {
        throw new Error('invalid sample: null')
      } else if (typeof(input) === 'object' && input !== null) {
        return objectHasSampleType(sample, input)
      } else {
        return false
      }
    case 'undefined':
      throw new Error('invalid sample: undefined')
    default:
      const s: any = sample
      throw new Error('invalid sample: ' + s.toString())
  }
}

function objectHasSampleType<A>(sample: {} & A, input: {}): bool {
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
  return canCast
}
