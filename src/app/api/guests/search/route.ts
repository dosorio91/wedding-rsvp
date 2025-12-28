import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { searchGuestsSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.length < 1) {
      return NextResponse.json([])
    }

    const allGuests = await db.guest.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        confirmed: true,
      },
    })

    // Función para remover acentos
    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    const searchTerm = removeAccents(query)
    const guests = allGuests.filter(guest => {
      const firstName = removeAccents(guest.firstName)
      const lastName = removeAccents(guest.lastName)
      const fullName = `${firstName} ${lastName}`
      
      return firstName.includes(searchTerm) || 
             lastName.includes(searchTerm) || 
             fullName.includes(searchTerm)
    }).slice(0, 8)

    return NextResponse.json(guests)
  } catch (error) {
    console.error('Error searching guests:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}