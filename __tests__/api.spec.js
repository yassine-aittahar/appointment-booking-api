import mongoose from 'mongoose'
import { createBuyer, createSeller, createAppointment } from '../utils/testUtil'
import { generateToken } from '../utils/auth'
import request from 'supertest'
import { app } from '../app'

describe('Booking API', () => {
  const id = mongoose.Types.ObjectId()
  let buyerToken
  let sellerToken
  let seller
  let buyer
  let appointment

  beforeEach(async () => {
    buyer = await createBuyer()
    seller = await createSeller()
    appointment = await createAppointment(buyer, seller)
    buyerToken = generateToken(buyer)
    sellerToken = generateToken(seller)
  })

  describe('Sellers API', () => {
    test('find sellers', async () => {
      let response = await request(app).get('/api/v1/sellers')
      expect(response.statusCode).toBe(200)

      response = await request(app).get(`/api/v1/sellers/${seller.id}`)
      expect(response.statusCode).toBe(200)
    })

    test('find sellers error code', async () => {
      const response = await request(app).get(`/api/v1/sellers/${id}`)
      expect(response.statusCode).toBe(404)
    })

    test('define sellers available time slots', async () => {
      const response = await request(app)
        .patch(`/api/v1/sellers`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          timeslots: [
            {
              slots: ['08:00', '09:00', '12:00'],
              day: 0
            },
            {
              slots: ['08:00', '09:00', '12:00'],
              day: 1
            }
          ]
        })

      console.log(response.body)
      expect(response.statusCode).toBe(200)

      // TODO response assertions
    })
  })

  describe('Appointments API', () => {
    describe('find appointments', () => {
      test('find appointments by seller', async () => {
        const response = await request(app)
          .get(`/api/v1/appointments`)
          .set('Authorization', `Bearer ${sellerToken}`)

        expect(response.statusCode).toBe(200)
      })

      test('find appointments by buyer', async () => {
        const response = await request(app)
          .get(`/api/v1/appointments`)
          .set('Authorization', `Bearer ${buyerToken}`)

        expect(response.statusCode).toBe(200)
      })
    })

    test('create appointment', async () => {
      const response = await request(app)
        .post(`/api/v1/appointments`)
        .set('Authorization', `Bearer ${buyerToken}`)
        .send({
          seller: seller.id,
          timeslot: '08:00',
          date: '2019-09-22'
        })

      expect(response.statusCode).toBe(201)
      // TODO complete test
    })

    test('accept reject appointment', async () => {
      const response = await request(app)
        .patch(`/api/v1/appointments/${appointment.id}`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          status: 'rejected'
        })

      expect(response.statusCode).toBe(200)
      // TODO complete test
    })
  })
})
