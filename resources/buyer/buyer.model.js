import mongoose from 'mongoose'
import { User, options } from '../user/user.model'

export const Buyer = User.discriminator(
  'buyer',
  new mongoose.Schema({
    appointments: {
      type: mongoose.Schema.Types.Array,
      ref: 'Appointment'
    }
  }),
  options
)
