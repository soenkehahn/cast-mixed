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
      } else if (Array.isArray(sample)) {
        return _arrayHasSampleType(sample, input)
      } else if (typeof(input) === 'object' && input !== null) {
        return _objectHasSampleType(sample, input)
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

function _objectHasSampleType<A>(sample: {} & A, input: {}): bool {
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

function _arrayHasSampleType<E>(sample: Array<E>, input: mixed): bool {
  if (sample.length !== 1) {
    throw new Error('invalid sample: array sample must have exactly 1 argument: ' + JSON.stringify(sample))
  }
  const elementSample = sample[0]
  if (! Array.isArray(input)) {
    return false
  } else {
    let canCast = true
    input.forEach(element => {
      canCast = canCast && hasSampleType(elementSample, element)
    })
    return canCast
  }
}
