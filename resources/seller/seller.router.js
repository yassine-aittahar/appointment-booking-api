import { Router } from 'express'
import controllers from './seller.controllers'
import { authorizationHeader, hasRole } from '../../utils/auth'
const router = Router()

// find sellers
router.get('/', controllers.findSellers)

// get seller by id
router.get('/:id', controllers.findOne)

// define seller available time slots
router.patch(
  '/',
  [authorizationHeader(), hasRole(['seller'])],
  controllers.defineTimeSlots
)

export default router
