import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    timeslot: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
)

export const Appointment = mongoose.model('Appointment', appointmentSchema)
