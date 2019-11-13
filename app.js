import createError from 'http-errors'
import express from 'express'
import path from 'path'
import { validateCredentials, login } from './utils/auth'
import logger from 'morgan'
import sellerRouter from './resources/seller/seller.router'
import appointmentRouter from './resources/appointment/appointment.router'
import cors from 'cors'

export const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.post('/auth', validateCredentials(), login)
app.post('/api/v1/auth', validateCredentials(), login)

// Routers
app.use('/api/v1/sellers', sellerRouter)
app.use('/api/v1/appointments', appointmentRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  console.log(err)

  if (err instanceof SyntaxError) {
    res.status(400).json({ code: 400, message: 'Please check your inputs' })
    return
  }

  // send error
  res.status(err.status || 500)
  res.send({
    code: err.code || 500,
    message: err.message
  })
})
