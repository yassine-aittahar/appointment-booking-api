import config from '../config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../resources/user/user.model'
import { body, validationResult, checkSchema } from 'express-validator'

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

export const validateCredentials = () => {
  return [
    body('password', 'password is required (length > 8)')
      .exists()
      .isLength({ min: 8 }),
    body('email', 'Invalid email')
      .exists()
      .isEmail()
  ]
}

export const authorizationHeader = () => {
  return checkSchema({
    Authorization: {
      in: ['headers'],
      customSanitizer: {
        options: value => {
          return value && value.startsWith('Bearer ')
            ? value.split('Bearer ')[1].trim()
            : value
        }
      },
      isJWT: true
    }
  })
}

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(401).json({ code: 401, message: errors.array() })
      return
    }

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).send({ code: 401, message: 'Unauthorized' })
    }

    const match = await comparePassword(password, user.password)

    if (match) {
      const token = generateToken(user)

      return res.status(201).send({
        id_token: token,
        timeStamp: Date.now(),
        id_token_expires_in: config.jwt.expiration * 1000
      })
    }
    return res.status(401).send({ code: 401, message: 'Unauthorized' })
  } catch (err) {
    return next(err)
  }
}
// has one role only or all
export const hasRole = roles => {
  return async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log('validator errors', errors)
      res.status(401).json({ code: 401, message: errors.array() })
      return
    }

    // the hearder was modified by validator middleware
    const token = req.headers.authorization
    let payload
    try {
      payload = await verifyToken(token)
    } catch (e) {
      console.log('verifyToken error', e)
      return res.status(401).send({ code: 401, message: 'Unauthorized' })
    }
    // token validation pass but recheck user in database
    const user = await User.findById(payload.id)
      .select('-password -createdAt -updatedAt -__v')
      .lean()
      .exec()

    if (!user) {
      console.log('user not found')
      return res.status(401).send({ code: 401, message: 'Unauthorized' })
    }

    // check permission
    let hasPermission = false
    if (user.roles) {
      user.roles.forEach(role => {
        if (roles.includes(role)) {
          hasPermission = true
        }
      })
    }

    if (!hasPermission) {
      return res.status(403).send({ code: 403, message: 'Forbidden' })
    }
    req.user = user
    next()
  }
}
