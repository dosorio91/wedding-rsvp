import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rsvpConfirmSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guestId, email, dietaryRestrictions } = rsvpConfirmSchema.parse(body)

    // Verificar que el invitado existe
    const guest = await db.guest.findUnique({
      where: { id: guestId },
    })

    if (!guest) {
      return NextResponse.json(
        { error: 'Invitado no encontrado' },
        { status: 404 }
      )
    }

    // Verificar si ya confirmó
    if (guest.confirmed) {
      return NextResponse.json(
        { error: 'Ya has confirmado tu participación anteriormente' },
        { status: 400 }
      )
    }

    // Actualizar invitado
    await db.guest.update({
      where: { id: guestId },
      data: {
        email,
        dietaryRestrictions: JSON.stringify(dietaryRestrictions),
        confirmed: true,
        confirmedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error confirming RSVP:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}