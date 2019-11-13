import { Seller } from './seller.model'

export const findSellers = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 100
  const skip = req.query.offset ? parseInt(req.query.offset) : 0
  const filter = req.query.filter ? req.query.filter : null
  let query
  if (filter) {
    const match = {
      $match: {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { about: { $regex: filter, $options: 'i' } },
          { email: { $regex: filter, $options: 'i' } }
        ]
      }
    }

    const aggregateCount = [match]
    const aggregateMatch = [match, { $limit: limit }, { $skip: skip }]

    return Seller.aggregate(aggregateCount)
      .count('count')
      .then(result => {
        return result[0].count
      })
      .then(count => {
        return Seller.aggregate(aggregateMatch)
          .exec()
          .then(sellers => {
            return res
              .status(200)
              .json({ count, data: sellers, offset: skip, limit })
          })
      })
      .catch(err => {
        console.log('aggregate error', err)
        res.status(500).end()
      })

    // {$limit: limit } , {$skip: skip}, {$count: 'count'}
    // query = Seller.find({ $text: { $search: filter } })
  } else {
    query = Seller.find()
  }

  return query
    .limit(limit)
    .skip(skip)
    .lean()
    .select('-password -createdAt -updatedAt -__v')
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

export const findOne = (req, res) => {
  console.log('Seller find one', req.params.id, Seller)
  return Seller.findById(req.params.id)
    .select('-password -createdAt -updatedAt -__v')
    .lean()
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(404).json({ code: 404, message: 'seller not found' })
      }
      res.status(200).json({ data: doc })
    })
    .catch(e => {
      console.error(e)
      res.status(400).json({ code: 404, message: 'seller not found' })
    })
}

export const defineTimeSlots = (req, res) => {
  return Seller.findByIdAndUpdate(
    req.user._id,
    { timeslots: req.body.timeslots },
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

export default { findSellers, findOne, defineTimeSlots }
