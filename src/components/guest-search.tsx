'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { RsvpDialog } from '@/components/rsvp-dialog'
import { Search } from 'lucide-react'

interface Guest {
  id: string
  firstName: string
  lastName: string
  confirmed: boolean
}

export function GuestSearch() {
  const [query, setQuery] = useState('')
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Debounce search
  useEffect(() => {
    if (!query.trim() || query.length < 1) {
      setGuests([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/guests/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setGuests(data)
        }
      } catch (error) {
        console.error('Error searching guests:', error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  const handleSelectGuest = (guest: Guest) => {
    if (guest.confirmed) {
      alert('Ya has confirmado tu participación anteriormente')
      return
    }
    
    setSelectedGuest(guest)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedGuest(null)
    setQuery('')
    setGuests([])
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">
                Busca tu nombre para confirmar asistencia
              </h2>
            </div>
            
            <div className="rounded-lg border shadow-md bg-white">
              <div className="p-3">
                <input
                  type="text"
                  placeholder="Escribe tu nombre o apellido..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="max-h-[300px] overflow-auto">
                {loading && (
                  <div className="py-6 text-center text-sm text-gray-500">
                    Buscando...
                  </div>
                )}
                
                {!loading && query.length >= 1 && guests.length === 0 && (
                  <div className="py-6 text-center text-sm text-gray-500">
                    No se encontraron invitados.
                  </div>
                )}
                
                {!loading && guests.length > 0 && (
                  <div className="p-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Invitados encontrados
                    </div>
                    {guests.map((guest) => (
                      <div
                        key={guest.id}
                        onClick={() => handleSelectGuest(guest)}
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 rounded-md border mb-2"
                      >
                        <div>
                          <span className="font-medium">
                            {guest.firstName} {guest.lastName}
                          </span>
                          {guest.confirmed && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Confirmado
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {!query && (
              <p className="text-center text-gray-500 text-sm">
                Comienza escribiendo tu nombre para encontrarte en la lista de invitados
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <RsvpDialog
        guest={selectedGuest}
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  )
}