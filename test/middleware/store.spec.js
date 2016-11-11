/* global describe before after it document */
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint func-names: "off" */

import { expect } from 'chai'
import {
  getByPath,
  setByPath,
  shouldUpdate,
  parsePath,
} from '../../src/middleware/store'

describe('store.spec.js', function () {
  describe('getByPath', () => {
    it('should get object by path', function () {
      const source = {
        prop: 1,
        some: {
          prop: 2,
          obj: {
            with: [{ array: true }],
          },
        },
      }

      expect(getByPath(['prop'], source)).to.equal(1)
      expect(getByPath(['some', 'prop'], source)).to.equal(2)
      expect(getByPath(['some', 'obj', 'with'], source)).to.deep.equal([{ array: true }])
      expect(getByPath(['some', 'obj', 'with', 0], source)).to.deep.equal({ array: true })
      expect(getByPath(['some', 'obj', 'with', 0, 'array'], source)).to.equal(true)
    })
  })

  describe('setByPath', () => {
    it('should set object by path', function () {
      const source = {}
      setByPath(['prop'], 1, source)
      expect(source.prop).to.equal(1)

      setByPath(['prop2', 'not', 'defined'], 2, source)
      expect(source.prop2.not.defined).to.equal(2)
    })
  })

  describe('shouldUpdate', () => {
    it('should return true if componenent needs to update', function () {
      expect(shouldUpdate(['todos', 'list'], null)).to.equal(false)
      expect(shouldUpdate(['todos', 'list'], ['something'])).to.equal(false)
      expect(shouldUpdate(['todos', 'list'], ['todos'])).to.equal(true)
      expect(shouldUpdate(['todos', 'list'], ['todos', 'list'])).to.equal(true)
      expect(shouldUpdate(['todos', 'list'], ['todos', 'list', 2])).to.equal(true)
      expect(shouldUpdate(['todos', 'list', 0], ['todos', 'list'])).to.equal(true)
    })
  })

  describe('parsePath', () => {
    it('should convert string to array', function () {
      expect(parsePath('todos.list')).to.deep.equal(['todos', 'list'])
      expect(parsePath('todos.list[1]')).to.deep.equal(['todos', 'list', '1'])
    })
  })
})
