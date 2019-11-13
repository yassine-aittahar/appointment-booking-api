import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export const options = { discriminatorKey: 'kind', timestamps: true }
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    roles: {
      type: [String],
      enum: ['seller', 'buyer']
    }
  },
  options
)

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    this.password = hash
    next()
  })
})

userSchema.index({ email: 'text' })

export const User = mongoose.model('User', userSchema)
