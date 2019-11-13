import { User } from '../../resources/user/user.model'

describe('Base User model', () => {
  describe('schema', () => {
    test('password', () => {
      const password = User.schema.obj.password
      expect(password).toEqual({
        type: String,
        required: true
      })
    })
    test('roles', () => {
      const roles = User.schema.obj.roles
      expect(roles).toEqual({
        type: [String],
        enum: ['seller', 'buyer']
      })
    })

    test('User model has email field', () => {
      const email = User.schema.obj.email
      expect(email).toEqual({
        type: String,
        required: true
      })
    })
  })
})
