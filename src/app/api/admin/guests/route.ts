import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createGuestSchema } from '@/lib/validations'

function isAuthorized(request: NextRequest): boolean {
  const password = request.headers.get('x-admin-password')
  console.log('Password recibida:', password) // Debug
  return password === 'matrimonio2025'
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  try {
    const guests = await db.guest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    const guestsWithParsedRestrictions = guests.map(guest => ({
      ...guest,
      dietaryRestrictions: guest.dietaryRestrictions 
        ? JSON.parse(guest.dietaryRestrictions)
        : [],
    }))

    return NextResponse.json(guestsWithParsedRestrictions)
  } catch (error) {
    console.error('Error fetching guests:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { firstName, lastName } = createGuestSchema.parse(body)

    const guest = await db.guest.create({
      data: {
        firstName,
        lastName,
      },
    })

    return NextResponse.json(guest)
  } catch (error) {
    console.error('Error creating guest:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}