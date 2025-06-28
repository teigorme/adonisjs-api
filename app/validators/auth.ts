import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(180).confirmed(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)

export const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255).optional(),
    email: vine.string().email().optional(),
    currentPassword: vine.string().optional(),
    newPassword: vine.string().minLength(8).maxLength(180).optional(),
  })
)
