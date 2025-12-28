import { z } from 'zod'

export const DietaryRestrictions = [
  'ninguna',
  'celiaco',
  'vegano',
  'vegetariano',
  'frutos-secos',
  'mariscos',
  'diabetes',
] as const

export type DietaryRestriction = typeof DietaryRestrictions[number]

export const rsvpConfirmSchema = z.object({
  guestId: z.string().cuid(),
  email: z.string().email('Email inválido'),
  dietaryRestrictions: z.array(z.enum(DietaryRestrictions)).default([]),
})

export const createGuestSchema = z.object({
  firstName: z.string().min(1, 'Nombre es requerido'),
  lastName: z.string().min(1, 'Apellido es requerido'),
})

export const searchGuestsSchema = z.object({
  q: z.string().min(1, 'Consulta es requerida'),
})

export type RsvpConfirmInput = z.infer<typeof rsvpConfirmSchema>
export type CreateGuestInput = z.infer<typeof createGuestSchema>
export type SearchGuestsInput = z.infer<typeof searchGuestsSchema>