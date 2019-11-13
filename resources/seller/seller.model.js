import mongoose from 'mongoose'
import { User, options } from '../user/user.model'

const sellerSchema = new mongoose.Schema({
  about: String,
  timeslots: [
    {
      _id: false,
      day: {
        type: mongoose.Schema.Types.Number,
        enum: [0, 1, 2, 3, 4, 5, 6]
      },
      slots: [String]
    }
  ]
})

export const Seller = User.discriminator('seller', sellerSchema, options)
