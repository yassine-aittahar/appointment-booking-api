import router from '../appointment.router'
import { assertRouterMatch } from '../../../utils/testUtil'

describe('Appointment router', () => {
  test('has routes described in API design document', () => {
    const routes = [
      { path: '/', method: 'post' },
      { path: '/:id', method: 'patch' },
      { path: '/', method: 'get' }
    ]

    assertRouterMatch(routes, router)
  })
})
