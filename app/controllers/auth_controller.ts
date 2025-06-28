import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator, updateProfileValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  /**
   * Register new user
   */
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.findBy('email', payload.email)
    if (user) {
      return response.badRequest()
    }

    await User.create(payload)

    return response.created()
  }

  /**
   * Login user
   */
  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)

    return response.ok({
      token,
      user,
    })
  }

  /**
   * Get current authenticated user
   */
  async me({ auth, response }: HttpContext) {
    await auth.authenticate()
    return response.ok(auth.user)
  }

  /**
   * Logout user
   */
  async logout({ auth, response }: HttpContext) {
    await auth.authenticate()
    await auth.use('api').invalidateToken()

    return response.ok
  }

  /**
   * Update user profile
   */
  async updateProfile({ auth, request, response }: HttpContext) {
    const user = await auth.authenticate()
    const payload = await request.validateUsing(updateProfileValidator)

    user.merge(payload)
    await user.save()

    return response.ok({
      user,
    })
  }
}
