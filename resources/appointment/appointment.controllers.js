import { Appointment } from '../appointment/appointment.model'

import mongoose from 'mongoose'
const create = async (req, res) => {
  // Iso String Date : req.body.date
  const date = new Date(req.body.date)
  req.body.date = date
  req.body.buyer = req.user._id
  req.body.status = 'pending'

  // find id there is an existing appointment in this date
  return Appointment.find({
    date: date,
    timeslot: req.body.timeslot,
    status: {
      $ne: 'rejected'
    }
  })
    .count('count')
    .exec()
    .then(count => {
      if (count && count > 0) {
        console.log('Appointment exist')
        res
          .status(409)
          .send({ code: 409, message: 'Conflict: Appointment exists' })
        return
      }

      return Appointment.create(req.body).then(doc => {
        res.status(201).json({ data: doc })
      })
    })
    .catch(e => {
      console.error('Appoint error => ', e)
      if (e instanceof mongoose.Error) {
        res.status(400).send({ code: 400, message: `Invalid Data ${e.path}` })
        return
      }

      res.status(500).send({ code: 500, message: 'internal error' })
    })
}
const updateStatus = (req, res) => {
  return Appointment.findOneAndUpdate(
    { _id: req.params.id, seller: req.user._id },
    { status: req.body.status },
    { new: true }
  )
    .lean()
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(404).json({ code: 404, message: 'not found' })
      }
      res.status(200).json({ data: doc })
    })
    .catch(e => {
      console.error(e)
      res.status(400).send({ code: 400, message: 'bad request' })
    })
}

/**
 * Get Appointment by connected user (buyer or seller)
 * filtred by status
 *
 * @param req.query.limit Pagination page size default 100
 * @param req.query.offset Pagination page start
 * @param  req.query.status 'pending', 'accepted','rejected'
 */
const findAppointment = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 100
  const skip = req.query.offset ? parseInt(req.query.offset) : 0
  const status = req.query.status ? req.query.status : null

  /*
  {
      $and: [
          { $or: [{a: 1}, {b: 1}] },
          { $or: [{c: 1}, {d: 1}] }
      ]
  }
  */

  let query
  const userQuery = { $or: [{ seller: req.user._id }, { buyer: req.user._id }] }
  if (status) {
    if (Array.isArray(status)) {
      const q = []
      status.forEach(filter => {
        q.push({ status: filter })
      })
      query = Appointment.find({
        $and: [userQuery, { $or: q }]
      })
    } else {
      query = Appointment.find({
        $and: [userQuery, { status }]
      })
    }
  } else {
    query = Appointment.find(userQuery)
  }

  return query
    .populate({ path: 'seller', select: 'name email _id' })
    .populate({ path: 'buyer', select: 'name email _id' })
    .limit(limit)
    .skip(skip)
    .sort('-createdAt')
    .lean()
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(200).json({ count: 0, data: [] })
      }

      return query
        .count()
        .limit(0)
        .skip(0)
        .then(count => {
          res.status(200).json({ count, offset: skip, limit, data: doc })
        })
    })
    .catch(e => {
      console.error(e)
      res.status(400).end()
    })
}

export const findBySeller = (req, res) => {
  res.status(501).send({ code: 501, message: 'Not yet implemented' })
}
export const findByBuyer = (req, res) => {
  res.status(501).send({ code: 501, message: 'Not yet implemented' })
}
export const findByBuyerOrSeller = (req, res) => {
  res.status(501).send({ code: 501, message: 'Not yet implemented' })
}

export default {
  create,
  updateStatus,
  findAppointment,
  findBySeller,
  findByBuyer,
  findByBuyerOrSeller
}
