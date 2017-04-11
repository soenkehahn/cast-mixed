// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import {number, string, union, prop} from '../src/type-spec'

describe('type-spec', () => {
  describe('safe casting', () => {
    it('to numbers', () => {
      const x: mixed = 5
      const y: ?number = number(x)
      expect(y).to.eql(x)
    })
    it('to strings', () => {
      const x: mixed = 'foo'
      const y: ?string = string(x)
      expect(y).to.eql(x)
    })
    describe('union types', () => {
      it('to first', () => {
        const x: mixed = 4
        const y: ?(number | string) = union(number, string, x)
        expect(y).to.eql(x)
      })
      it('to second', () => {
        const x: mixed = 'foo'
        const y: ?(number | string) = union(number, string, x)
        expect(y).to.eql(x)
      })
    })
    describe('object properties', () => {
      it('to objects with a single property', () => {
        const x: mixed = {foo: 'bar'}
        // const y: ?{foo: string} = prop(('foo': 'foo'), string, x)
        // expect(y).to.eql(x)
      })
    })
    it('foo', () => {
      type Identity<a> = {get: a}
      const x: Identity<number> = {get: 4}
      expect(x.get).to.eql(4)

      // function wrapProps(

      /*
      const y: {foo: string} = {foo: 'bar'}
      const z: {foo: Identity<string>} = wrapProps(y)
      expect(z.foo.get).to.eql('bar')
      */
    })
  })
})
