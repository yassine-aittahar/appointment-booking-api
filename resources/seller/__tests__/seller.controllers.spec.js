import controllers from '../seller.controllers'
import { isFunction } from 'lodash'

describe('Test seller controllers', () => {
  test('test methods', () => {
    const methods = ['findSellers', 'findOne', 'defineTimeSlots']

    methods.forEach(method => {
      expect(isFunction(controllers[method])).toBeTruthy()
    })
  })
})
