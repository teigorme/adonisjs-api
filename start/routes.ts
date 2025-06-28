import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    router.post('/register', '#controllers/auth_controller.register')
    router.post('/login', '#controllers/auth_controller.login')
  })
  .prefix('/api')

router
  .group(() => {
    router.get('/me', '#controllers/auth_controller.me')
    router.post('/logout', '#controllers/auth_controller.logout')
    router.put('/profile', '#controllers/auth_controller.updateProfile')
  })
  .prefix('/api')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/users', '#controllers/users_controller.index')
    router.post('/users', '#controllers/users_controller.store')
    router.get('/users/:id', '#controllers/users_controller.show')
    router.put('/users/:id', '#controllers/users_controller.update')
    router.delete('/users/:id', '#controllers/users_controller.destroy')
  })
  .prefix('/api')
  .use(middleware.auth())

router.get('/', () => {
  return { message: 'Hello world' }
})
