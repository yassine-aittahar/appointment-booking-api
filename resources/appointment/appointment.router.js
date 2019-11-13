import express from 'express'
import appointmentControllers from './appointment.controllers'
import { authorizationHeader, hasRole } from '../../utils/auth'
const router = express.Router()

router.post(
  '/',
  [authorizationHeader(), hasRole(['buyer'])],
  appointmentControllers.create
)
router.patch(
  '/:id',
  [authorizationHeader(), hasRole(['seller'])],
  appointmentControllers.updateStatus
)
router.get(
  '/',
  [authorizationHeader(), hasRole(['seller', 'buyer'])],
  appointmentControllers.findAppointment
)

router.get(
  '/:id',
  [authorizationHeader(), hasRole('buyer')],
  appointmentControllers.findByBuyerOrSeller
)

router.get(
  '/seller/:id',
  [authorizationHeader(), hasRole('seller')],
  appointmentControllers.findBySeller
)
router.get(
  '/buyer/:id',
  [authorizationHeader(), hasRole('buyer')],
  appointmentControllers.findByBuyer
)

export default router
