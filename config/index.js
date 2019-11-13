import { merge } from 'lodash'
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  server: {
    port: 3000,
    host: 'localhost',
    https: false
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: '1d'
  }
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./development').config
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing').config
    break
  default:
    envConfig = require('./development').config
}

export default merge(baseConfig, envConfig)
