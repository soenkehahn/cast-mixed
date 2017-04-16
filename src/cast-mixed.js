// @flow

export class Spec<Sample> {

  sample: Sample

  conformsToSpec: mixed => bool

  constructor(sample: Sample, conformsToSpec: mixed => bool) {
    this.sample = sample,
    this.conformsToSpec = conformsToSpec
  }
}

function getSample<Sample>(spec: Spec<Sample>): Sample {
  return spec.sample
}

export function cast<A>(spec: Spec<A>, input: mixed): ?A {
  if (spec.conformsToSpec(input)) {
    return unsafeCast(input)
  } else {
    return null
  }
}

function unsafeCast<A, B>(a: A): B {
  const r: any = a
  return r
}

// * spec creation functions

export const number: Spec<number> = new Spec(42, mixed => {
  return (typeof(mixed) === 'number')
})

export const string: Spec<string> = new Spec('foo', mixed => {
  return (typeof(mixed) === 'string')
})

export const boolean: Spec<boolean> = new Spec(true, mixed => {
  return (typeof(mixed) === 'boolean')
})

export function object<A, O: { [string]: Spec<A>}>(object: O): Spec<$ObjMap<O, typeof(getSample)>> {
  const result = {}
  Object.keys(object).forEach(key => {
    result[key] = getSample(object[key])
  })
  return new Spec(result, mixed => {
    if (typeof(mixed) === 'object') {
      if (mixed === null) {
        return false
      } else {
        const obj: {} = mixed
        const keys = Object.keys(object)
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const valueSpec = object[key]
          if (obj.hasOwnProperty(key)) {
            if (!valueSpec.conformsToSpec(obj[key])) {
              return false
            }
          } else {
            return false
          }
        }
        return true
      }
    } else {
      return false
    }
  })
}

export function array<A>(elementSpec: Spec<A>): Spec<Array<A>> {
  return new Spec([elementSpec.sample], mixed => {
    if (Array.isArray(mixed)) {
      let canCast = true
      mixed.forEach(element => {
        canCast = canCast && elementSpec.conformsToSpec(element)
      })
      return canCast
    } else {
      return false
    }
  })
}

export function union<A, B>(a: Spec<A>, b: Spec<B>): Spec<A | B> {
  return new Spec(a.sample, mixed => {
    return a.conformsToSpec(mixed)
      || b.conformsToSpec(mixed)
  })
}

export function union3<A, B, C>(a: Spec<A>, b: Spec<B>, c: Spec<C>): Spec<A | B | C> {
  return new Spec(a.sample, mixed => {
    return a.conformsToSpec(mixed)
      || b.conformsToSpec(mixed)
      || c.conformsToSpec(mixed)
  })
}
