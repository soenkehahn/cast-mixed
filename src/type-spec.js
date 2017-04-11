// @flow

export function number(x: mixed): ?number {
  if (typeof(x) === 'number') {
    return x
  }
  return null
}

export function string(x: mixed): ?string {
  if (typeof(x) === 'string') {
    return x
  }
  return null
}

export function union<A, B>(f: mixed => ?A, g: mixed => ?B, x: mixed): ?(A | B) {
  const a: ?A = f(x)
  if (a !== null) {
    return a
  }
  return g(x)
}

export function prop<Property, A>(p: Property, f: mixed => ?A, x: mixed): ?{Property: A} {
  throw 'hu'
}
