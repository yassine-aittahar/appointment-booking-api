import mongoose from 'mongoose'
import {
  clearDatabase,
  createBuyerUser,
  createSellerUser,
  createAppoint
} from './utils/t'
import _ from 'lodash'

// 'Populate random test data'
const populate = async () => {
  try {
    const buyers = []
    const sellers = []

    // clear database
    await clearDatabase()

    // populate buyers
    let buyer
    const names = ['Karim', 'Mohammed', 'Billel', 'Ali', 'Khadidja', 'Amina']

    await Promise.all(
      _.map(names, async name => {
        buyer = await createBuyerUser(name, `${name}@gmail.com`, '12345678')
        buyers.push(buyer)
      })
    )

    // populate sellers

    const sellersNames = [
      {
        name: 'Modifab',
        about:
          'SpecialistGarage for all kinds of modification and Fabrications in all kinds of Cars'
      },
      { name: 'Auto Vision', about: 'Rims Flywheel' },
      {
        name: 'Classic Car',
        about:
          'Specialist for shape Parts and Workshop for GMC, Chevrolet Classics and other American Muscules'
      },
      { name: 'Tazbeet', about: '' },
      {
        name: 'Al Rafa garage',
        about: 'Transmission Works Scrapyard Mechanic Denter'
      },
      { name: 'Top performance', about: 'Turbo' }
    ]

    const timeslots = [
      {
        day: 0,
        slots: ['08:00', '09:00', '10:00', '14:00', '15:00', '17:00']
      },
      {
        day: 1,
        slots: ['08:00', '09:00', '11:00', '13:00', '16:00', '17:00']
      },
      {
        day: 2,
        slots: ['08:00', '09:00', '10:00', '14:00', '15:00', '17:00']
      },
      {
        day: 3,
        slots: ['08:00', '09:00', '10:00', '14:00', '15:00', '17:00']
      },
      {
        day: 4,
        slots: ['08:00', '09:00', '10:00', '14:00', '15:00', '17:00']
      },
      {
        day: 5,
        slots: ['08:00', '09:00', '10:00', '14:00', '15:00', '17:00']
      },
      {
        day: 6,
        slots: ['08:00', '09:00', '10:00', '14:00', '15:00', '17:00']
      }
    ]

    const yassineSeller = await createSellerUser(
      'yassine',
      'yassine.aittahar@gmail.com',
      '87654321',
      'car services',
      timeslots
    )
    await Promise.all(
      _.map(sellersNames, async seller => {
        const email = `${seller.name
          .split(' ')
          .join('-')
          .toLowerCase()}@gmail.com`
        seller = await createSellerUser(
          seller.name,
          email,
          '87654321',
          seller.about,
          timeslots
        )
        sellers.push(seller)
      })
    )
    // for each buyer create appointment with yassine seller
    const status = ['pending', 'rejected', 'accepted']

    await Promise.all(
      _.map(buyers, async (buyer, index) => {
        const state = status[Math.floor(Math.random() * 3)]
        const timeslot = yassineSeller.timeslots[index].slots[index]

        console.log('Appointment', buyer.name, yassineSeller.name, timeslot)
        await createAppoint(buyer, yassineSeller, state, timeslot)
      })
    )

    // for each buyer create appointment with random  seller

    await Promise.all(
      _.map(buyers, async (buyer, index) => {
        const state = status[Math.floor(Math.random() * 3)]
        const seller = sellers[Math.floor(Math.random() * sellers.length)]
        const timeslot = seller.timeslots[index].slots[index]
        console.log('Appointment', buyer.name, seller.name, timeslot)
        await createAppoint(buyer, seller, state, timeslot)
      })
    )

    await mongoose.disconnect()
    console.log('populate finished with sucess ')
  } catch (e) {
    console.log('populate error => ', e)
  }
}

populate()
