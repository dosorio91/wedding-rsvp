'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AddGuestDialog } from '@/components/add-guest-dialog'
import { Trash2, Plus, Users, CheckCircle, XCircle } from 'lucide-react'

interface Guest {
  id: string
  firstName: string
  lastName: string
  email?: string
  dietaryRestrictions: string[]
  confirmed: boolean
  confirmedAt?: string
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const authenticate = () => {
    if (password === 'matrimonio2025') {
      setIsAuthenticated(true)
      fetchGuests()
    } else {
      alert('Contraseña incorrecta')
    }
  }

  const fetchGuests = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/guests', {
        headers: {
          'x-admin-password': password,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setGuests(data)
      } else {
        alert('Error al cargar invitados')
      }
    } catch (error) {
      console.error('Error fetching guests:', error)
      alert('Error al cargar invitados')
    } finally {
      setLoading(false)
    }
  }

  const deleteGuest = async (guestId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este invitado?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/guests/${guestId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': password,
        },
      })

      if (response.ok) {
        setGuests(guests.filter(g => g.id !== guestId))
      } else {
        alert('Error al eliminar invitado')
      }
    } catch (error) {
      console.error('Error deleting guest:', error)
      alert('Error al eliminar invitado')
    }
  }

  const formatDietaryRestrictions = (restrictions: string[]) => {
    if (!restrictions || restrictions.length === 0 || restrictions.includes('ninguna')) {
      return 'Ninguna'
    }

    const labels: Record<string, string> = {
      'celiaco': 'Celíaco',
      'vegano': 'Vegano',
      'vegetariano': 'Vegetariano',
      'frutos-secos': 'Alergia frutos secos',
      'mariscos': 'Alergia mariscos',
      'diabetes': 'Diabetes',
    }

    return restrictions.map(r => labels[r] || r).join(', ')
  }

  const confirmedGuests = guests.filter(g => g.confirmed)
  const pendingGuests = guests.filter(g => !g.confirmed)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Panel de Administración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && authenticate()}
            />
            <Button onClick={authenticate} className="w-full">
              Ingresar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Panel de Administración - Matrimonio
          </h1>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Invitado
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Invitados</p>
                  <p className="text-3xl font-bold">{guests.length}</p>
                </div>
                <Users className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Confirmados</p>
                  <p className="text-3xl font-bold text-green-600">{confirmedGuests.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pendientes</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingGuests.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Invitados</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Cargando...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Nombre</th>
                      <th className="text-left p-2">Apellido</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Restricciones</th>
                      <th className="text-left p-2">¿Confirmó?</th>
                      <th className="text-left p-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((guest) => (
                      <tr key={guest.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{guest.firstName}</td>
                        <td className="p-2">{guest.lastName}</td>
                        <td className="p-2">{guest.email || '-'}</td>
                        <td className="p-2 text-sm">
                          {formatDietaryRestrictions(guest.dietaryRestrictions)}
                        </td>
                        <td className="p-2">
                          {guest.confirmed ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              Sí
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                              No
                            </span>
                          )}
                        </td>
                        <td className="p-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteGuest(guest.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {guests.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No hay invitados registrados
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <AddGuestDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onGuestAdded={fetchGuests}
          adminPassword={password}
        />
      </div>
    </div>
  )
}