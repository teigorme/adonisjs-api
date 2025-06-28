import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(1).maxLength(255),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(1).maxLength(255),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  })
)
