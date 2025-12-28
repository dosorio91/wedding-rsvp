import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { searchGuestsSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    console.log('Búsqueda recibida:', query) // Debug

    if (!query || query.length < 1) {
      return NextResponse.json([])
    }

    // Para debug, devolvemos todos los invitados primero
    const allGuests = await db.guest.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        confirmed: true,
      },
    })

    console.log('Todos los invitados:', allGuests) // Debug

    const searchTerm = query.toLowerCase()
    const guests = allGuests.filter(guest => 
      guest.firstName.toLowerCase().includes(searchTerm) || 
      guest.lastName.toLowerCase().includes(searchTerm)
    ).slice(0, 8)

    console.log('Invitados filtrados:', guests) // Debug

    return NextResponse.json(guests)
  } catch (error) {
    console.error('Error searching guests:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}