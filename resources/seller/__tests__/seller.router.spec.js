import router from '../seller.router'
import { assertRouterMatch } from '../../../utils/testUtil'

describe('Seller router', () => {
  test('has routes described in API design document', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:id', method: 'get' },
      { path: '/', method: 'patch' }
    ]
    assertRouterMatch(routes, router)
  })
})
