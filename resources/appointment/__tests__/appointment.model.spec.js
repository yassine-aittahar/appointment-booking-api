import { Appointment } from '../appointment.model'
import mongoose from 'mongoose'

describe('Appointment model', () => {
  describe('schema', () => {
    test('date', () => {
      const date = Appointment.schema.obj.date
      expect(date).toEqual({
        type: Date,
        required: true
      })
    })
    test('timeslot', () => {
      const timeslot = Appointment.schema.obj.timeslot
      expect(timeslot).toEqual({
        type: String,
        required: true
      })
    })

    test('seller', () => {
      const seller = Appointment.schema.obj.seller
      expect(seller).toEqual({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      })
    })

    test('buyer', () => {
      const buyer = Appointment.schema.obj.buyer
      expect(buyer).toEqual({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      })
    })
  })
})
