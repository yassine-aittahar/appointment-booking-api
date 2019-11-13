import { Buyer } from '../buyer.model'

describe('Buyer model', () => {
  describe('schema', () => {
    test('Buyer model has name field', () => {
      const name = Buyer.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true
      })
    })
    test('Buyer model has email field', () => {
      const email = Buyer.schema.obj.email
      expect(email).toEqual({
        type: String,
        required: true
      })
    })
  })
})
