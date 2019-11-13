import mongoose from 'mongoose'
import { connect } from './db'
import { Seller } from '../resources/seller/seller.model'
import { Appointment } from '../resources/appointment/appointment.model'
import { Buyer } from '../resources/buyer/buyer.model'
import _ from 'lodash'
import config from '../config'

const models = { Appointment, Buyer, Seller }

export const routerMatch = (route, router) => {
  const match =
    router.stack &&
    router.stack.find(
      s => s.route.path === route.path && s.route.methods[route.method]
    )

  return match
}

export const assertRouterMatch = (routes, router) => {
  routes.forEach(route => {
    const match = routerMatch(route, router)
    expect(match).toBeTruthy()
  })
}

export const remove = model =>
  new Promise((resolve, reject) => {
    model.remove(err => {
      if (err) return reject(err)
      resolve()
    })
  })

export const clearDatabase = async (dbUri = config.dbUri, opts = {}) => {
  console.log('clear database => ', dbUri)

  function clearDB() {
    return Promise.all(_.map(models, m => remove(m)))
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await connect(
        dbUri,
        opts
      )

      await clearDB()
      console.log('clearDB finished')

      await Promise.all(Object.keys(models).map(name => models[name].init()))
    } catch (e) {
      console.log('connection error')
      console.error(e)
      throw e
    }
  } else {
    await clearDB()
    console.log('clearDB finished')
  }
}

export const createSeller = async () => {
  return createSellerUser(
    'yassine',
    'yassine.aittahar@gmail.com',
    '87654321',
    'car services'[{ day: 0, slots: ['08:00', '09:00', '12:00'] }]
  )
}

export const createBuyer = () => {
  return createBuyerUser('hocine', 'hocine@gmail.com', '12345678')
}

export const createAppointment = async (buyer, seller) => {
  try {
    const a = Appointment.create({
      date: Date.now(),
      timeslot: '08:00',
      seller: seller.id,
      buyer: buyer.id,
      status: 'pending'
    })
    return a
  } catch (e) {
    console.log('createAppointment error')
    console.error(e)
    throw e
  }
}

export const createAppoint = async (buyer, seller, status, timeslot) => {
  try {
    const a = Appointment.create({
      date: Date.now(),
      timeslot,
      seller,
      buyer,
      status
    })
    return a
  } catch (e) {
    console.log('createAppoint error', e)
    throw e
  }
}

export const createSellerUser = async (
  name,
  email,
  password,
  about,
  timeslots
) => {
  try {
    const seller = await Seller.create({
      name,
      email,
      password,
      about,
      roles: ['seller'],
      timeslots
    })

    console.log('createUserSeller seller => ', seller.name, seller.id)
    return seller
  } catch (e) {
    console.log('createUserSeller error')
    console.error(e)
    throw e
  }
}

export const createBuyerUser = async (name, email, password) => {
  try {
    const b = await Buyer.create({
      name,
      email,
      password,
      roles: ['buyer']
    })
    console.log('createBuyerUser buyer => ', b.name, b.id)

    return b
  } catch (e) {
    console.log('createBuyer error')
    console.error(e)
    throw e
  }
}
