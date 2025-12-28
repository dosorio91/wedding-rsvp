'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddGuestDialogProps {
  open: boolean
  onClose: () => void
  onGuestAdded: () => void
  adminPassword: string
}

export function AddGuestDialog({ 
  open, 
  onClose, 
  onGuestAdded, 
  adminPassword 
}: AddGuestDialogProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName.trim() || !lastName.trim()) {
      alert('Por favor complete todos los campos')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error || 'Error al crear invitado')
        return
      }

      setFirstName('')
      setLastName('')
      onGuestAdded()
      onClose()
    } catch (error) {
      console.error('Error creating guest:', error)
      alert('Error al crear invitado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Agregar Invitado</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Nombre</label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Nombre"
              required
              className="bg-white border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Apellido</label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Apellido"
              required
              className="bg-white border-gray-300"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Agregando...' : 'Agregar'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}