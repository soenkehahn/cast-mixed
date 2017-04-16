// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import {Spec, cast, number, string, boolean, object, array, union, union3} from '../src/cast-mixed'

function test<A>(spec: Spec<A>, input: mixed, expected: ?A) {
  const result = cast(spec, input)
  expect(result).to.eql(expected)
}

describe('cast-mixed', () => {
  describe('cast', () => {

    it('provides static type information to flow', () => {
      const mixed: mixed = 5
      const result = cast(object({foo: string}), mixed)
      if (result) {
        (result.foo: string)
      }
    })

    describe('numbers', () => {

      it('allows to cast', () => {
        test(number, 5, 5)
      })

      it('rejects other types', () => {
        test(number, {foo: 5}, null)
      })

    })

    describe('strings', () => {

      it('allows to cast', () => {
        test(string, 'bar', 'bar')
      })

      it('rejects other types', () => {
        test(string, 5, null)
      })

    })

    describe('booleans', () => {

      it('allows to cast', () => {
        test(boolean, true, true)
      })

      it('rejects other types', () => {
        test(boolean, 5, null)
      })

    })

    describe('objects', () => {
      it('allows to cast', () => {
        test(object({foo: number}), {foo: 5}, {foo: 5})
      })

      it('rejects other types', () => {
        test(object({foo: number}), 'foo', null)
      })

      describe('recursively checks fields', () => {

        it('allows to cast field values', () => {
          test(object({foo: object({bar: number})}), {foo: {bar: 5}}, {foo: {bar: 5}})
        })

        it('rejects other types in field values', () => {
          test(object({foo: object({bar: number})}), {foo: {bar: 'foo'}}, null)
        })

        it('rejects objects with missing fields', () => {
          test(object({foo: number, bar: number}), {foo: 5}, null)
        })

      })

      it('allows more fields than in the spec', () => {
        test(object({foo: number}), {foo: 5, bar: 6}, {foo: 5, bar: 6})
      })

    })

    describe('arrays', () => {

      it('allows to cast to arrays', () => {
        test(array(string), ['bar'], ['bar'])
      })

      it('rejects other types', () => {
        test(array(string), {'foo': 'bar'}, null)
      })

      it('returns null in case one element is off', () => {
        test(array(string), ['foo', 4, 'bar'], null)
      })

    })

    describe('unions', () => {

      it('allows to cast to the first type', () => {
        test(union(number, string), 5, 5)
      })

      it('allows to cast to the second type', () => {
        test(union(number, string), 'foo', 'foo')
      })

      it('rejects other types', () => {
        test(union(number, string), {foo: 5}, null)
      })

      it('works for three types', () => {
        test(union3(number, string, array(number)), 5, 5)
        test(union3(number, string, array(number)), 'foo', 'foo')
        test(union3(number, string, array(number)), [1, 2, 3], [1, 2, 3])
      })

    })

  })

})
