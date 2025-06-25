/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Authentication routes (public)
router
  .group(() => {
    router.post('/login', '#controllers/auth_controller.login')
    router.post('/test-login', '#controllers/auth_controller.testLogin')
    router.post('/register', '#controllers/auth_controller.register') // For admin use
  })
  .prefix('api/auth')

// Protected auth routes
router
  .group(() => {
    router.post('/logout', '#controllers/auth_controller.logout')
    router.get('/me', '#controllers/auth_controller.me')
    router.post('/change-password', '#controllers/auth_controller.changePassword')
  })
  .prefix('api/auth')
  .use([middleware.auth()])

// Legacy user management routes (for backward compatibility)
router.get('/users', '#controllers/users_controller.index')

// Protected API routes
router
  .group(() => {
    router
      .group(() => {
        router.get('/all', '#controllers/participants_controller.index')
        router.get('/search', '#controllers/participants_controller.searchParticipants')
        router.post('/add', '#controllers/participants_controller.store')
        // router.get('/:id', '#controllers/participants_controller.showById')
        router.post('/show-profile', '#controllers/participants_controller.showByUserName')
        router.post('/attendance/check-in', '#controllers/attendances_controller.store')
        router.get('/attendance/all', '#controllers/attendances_controller.index')
        router.get('/attendance/:id', '#controllers/attendances_controller.showAttendanceById')
        router.put('/:id', '#controllers/participants_controller.update')
        router.delete('/:id', '#controllers/participants_controller.destroy')
      })
      .prefix('participant')

    router.get('/meeting-seats', '#controllers/meeting_seats_controller.index')
    router.post(
      '/settings/update-meeting-date',
      '#controllers/settings_controller.updateMeetingDate'
    )

    router
      .group(() => {
        router.get('/meeting-date', '#controllers/settings_controller.getMeetingDate')
        router.get('/meeting-seats', '#controllers/settings_controller.getAvailableMeetingSeats')
        router.post('/add-meeting-seat', '#controllers/settings_controller.addMeetingSeat')

        router.get('/companies', '#controllers/settings_controller.getCompanies')
        router.post('/add-company', '#controllers/settings_controller.addCompany')

        router.get('/vehicles', '#controllers/settings_controller.getVehicles')
        router.post('/add-vehicle', '#controllers/settings_controller.addVehicle')
        router.put('/update-vehicle/:id', '#controllers/settings_controller.updateVehicle')
        router.delete('/delete-vehicle/:id', '#controllers/settings_controller.deleteVehicle')
        router.get('/locations', '#controllers/settings_controller.getLocations')
      })
      .prefix('settings')
    router
      .group(() => {
        router.get('/all', '#controllers/users_controller.index')
        router.post('/add', '#controllers/users_controller.store')
        router.delete('/:id', '#controllers/users_controller.destroy')
        router.post('/update', '#controllers/users_controller.updateUser')
        router.post('/role/update', '#controllers/users_controller.updateRole')
      })
      .prefix('user')

    router
      .group(() => {
        router
          .group(() => {
            router.get('/all', '#controllers/sot_controller.allFindings')
            router.get('/:id', '#controllers/sot_controller.getSotFindingsByParticipantId')
            router.post('/add', '#controllers/sot_controller.storeSotFinding')
            router.delete('/:id', '#controllers/sot_controller.destroy')
          })
          .prefix('finding')

        router
          .group(() => {
            router.get('/all', '#controllers/sot_group_controller.allSotGroup')
            router.post('/add', '#controllers/sot_group_controller.store')
            router.get('/:Id', '#controllers/sot_group_controller.sotGroupById')
            router.put('/update/:id', '#controllers/sot_group_controller.update')
            router.delete('/delete/:id', '#controllers/sot_group_controller.destroy')
          })
          .prefix('group')

        router
          .group(() => {
            router.get('/all', '#controllers/sot_chart_controller.index')
          })
          .prefix('chart')
        router
          .group(() => {
            router.get('/all', '#controllers/clsr_controller.index')
          })
          .prefix('clsr')
      })
      .prefix('sot')
  })
  .prefix('api')
  .use([middleware.auth()])
