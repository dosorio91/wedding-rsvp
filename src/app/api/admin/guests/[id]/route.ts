import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAuthorized(request: NextRequest): boolean {
  const password = request.headers.get('x-admin-password')
  return password === process.env.ADMIN_PASSWORD
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  try {
    const { id } = await params
    await db.guest.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting guest:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}