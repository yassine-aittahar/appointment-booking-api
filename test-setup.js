import mongoose from 'mongoose'
import cuid from 'cuid'
import { clearDatabase } from './utils/testUtil'

const url =
  process.env.MONGODB_URI ||
  process.env.DB_URL ||
  'mongodb://localhost:27017/booking-test-'

beforeEach(async done => {
  const dbUri = url + cuid()
  await clearDatabase(dbUri)
  return done()
})

afterEach(async done => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
  return done()
})
afterAll(done => {
  return done()
})
