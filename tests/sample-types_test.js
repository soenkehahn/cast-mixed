// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import {cast} from '../src/sample-types'

function test<A>(sample: A, input: mixed, expected: ?A) {
  const result = cast(sample, input)
  expect(result).to.eql(expected)
}


describe('sample-types', () => {
  describe('cast', () => {

    describe('invalid samples', () => {

      it('throws an exception in case of invalid samples', () => {
        const f = () => cast(() => {}, 5)
        expect(f).to.throw(/^invalid sample: \(\) => {}$/)
      })

      it("doesn't allow null as samples", () => {
        const f = () => cast(null, null)
        expect(f).to.throw(/^invalid sample: null$/)
      })

      it("doesn't allow undefined as samples", () => {
        const f = () => cast(undefined, undefined)
        expect(f).to.throw(/^invalid sample: undefined$/)
      })

    })

    describe('numbers', () => {

      it('allows to cast', () => {
        test(42, 5, 5)
      })

      it('rejects other types', () => {
        test(42, {foo: 5}, null)
      })

    })

    describe('strings', () => {

      it('allows to cast', () => {
        test('foo', 'bar', 'bar')
      })

      it('rejects other types', () => {
        test('foo', 5, null)
      })

    })

    describe('objects', () => {
      it('allows to cast', () => {
        test({foo: 42}, {foo: 5}, {foo: 5})
      })

      it('rejects other types', () => {
        test({foo: 42}, 'foo', null)
      })

      describe('recursively checks fields', () => {

        it('allows to cast field values', () => {
          test({foo: {bar: 42}}, {foo: {bar: 5}}, {foo: {bar: 5}})
        })

        it('rejects other types in field values', () => {
          test({foo: {bar: 42}}, {foo: {bar: 'foo'}}, null)
        })

        it('rejects objects with missing fields', () => {
          test({foo: 42, bar: 42}, {foo: 5}, null)
        })

      })

      it('allows more fields than in the sample', () => {
        test({foo: 42}, {foo: 5, bar: 6}, {foo: 5, bar: 6})
      })

      it('allows optional fields')

      it('keeps additional fields in the object')

      it('allows refinement of object types in multiple steps')
    })

    it('classes')

    describe('arrays', () => {

      it('allows to cast to arrays')

      it('returns null in case one element is off')

    })

    describe('unions', () => {

      it('allows to specify unions')

    })

    it('allows nullable types')

  })
})
