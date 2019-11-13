import config from '../config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const generateToken = user => {
  return jwt.sign({ id: user.id, roles: user.roles }, config.jwt.secret, {
    expiresIn: config.jwt.expiration
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) {
        return reject(err)
      }
      resolve(match)
    })
  })
}
