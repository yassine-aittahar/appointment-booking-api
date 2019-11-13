import controllers from '../appointment.controllers'
import { isFunction } from 'lodash'

describe('Test appointment controllers must be conform to the api spec', () => {
  test('has methods', () => {
    const methods = ['create', 'updateStatus', 'findAppointment']

    methods.forEach(method => {
      expect(isFunction(controllers[method])).toBeTruthy()
    })
  })
})
