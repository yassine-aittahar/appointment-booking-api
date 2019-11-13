import mongoose from 'mongoose'
import config from '../config'

export const connect = (url = config.dbUri, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}
