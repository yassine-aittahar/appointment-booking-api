import request from 'supertest'
import { app } from '../app'
import { generateToken } from '../utils/auth'
import mongoose from 'mongoose'
import { createBuyer, createSeller } from '../utils/testUtil'

describe('API Authentication:', () => {
  const id = mongoose.Types.ObjectId()
  let buyerToken
  let sellerToken
  let seller
  let buyer
  beforeEach(async () => {
    buyer = await createBuyer()
    seller = await createSeller()
    buyerToken = generateToken(buyer)
    sellerToken = generateToken(seller)
  })

  describe('authentication ', () => {
    test('Should be Public (authorized without authentication) ', async () => {
      let response = await request(app).get('/api/v1/sellers')
      expect(response.statusCode).toBe(200)

      response = await request(app).get(`/api/v1/sellers/${seller.id}`)
      expect(response.statusCode).toBe(200)
    })

    test('Should be unauthorized', async () => {
      let response = await request(app).post('/api/v1/appointments')
      expect(response.statusCode).toBe(401)

      response = await request(app).patch(`/api/v1/appointments/${id}`)
      expect(response.statusCode).toBe(401)

      response = await request(app).get(`/api/v1/appointments`)
      expect(response.statusCode).toBe(401)
    })

    test('Should be Forbidden', async () => {
      let res = await request(app)
        .patch(`/api/v1/appointments/${id}`)
        .set('Authorization', `Bearer ${buyerToken}`)

      expect(res.statusCode).toBe(403)

      res = await request(app)
        .post('/api/v1/appointments')
        .set('Authorization', `Bearer ${sellerToken}`)

      expect(res.statusCode).toBe(403)
    })

    test('Should be authorized', async () => {
      const res = await request(app)
        .patch(`/api/v1/appointments/${id}`)
        .set('Authorization', `Bearer ${sellerToken}`)

      expect(res.statusCode).not.toBe(401)
      expect(res.statusCode).not.toBe(403)
    })
  })
})
