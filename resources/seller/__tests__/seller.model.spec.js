import { Seller } from '../seller.model'

describe('Seller model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = Seller.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true
      })
    })
    test('about', () => {
      const about = Seller.schema.obj.about
      expect(about).toEqual(String)
    })

    test('Seller model has email field', () => {
      const email = Seller.schema.obj.email
      expect(email).toEqual({
        type: String,
        required: true
      })
    })
  })
})
