import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return await User.query().paginate(page, limit)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    try {
      const user = await User.create(payload)
      return response.created(user)
    } catch (error) {
      return response.badRequest()
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return user
    } catch (error) {
      return response.notFound()
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(updateUserValidator)

    try {
      user.merge(payload)
      await user.save()
      return user
    } catch (error) {
      return response.badRequest()
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    try {
      await user.delete()
      return response.noContent()
    } catch (error) {
      return response.badRequest()
    }
  }
}
