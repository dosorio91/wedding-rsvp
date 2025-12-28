'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

interface Guest {
  id: string
  firstName: string
  lastName: string
  confirmed: boolean
}

interface RsvpDialogProps {
  guest: Guest | null
  open: boolean
  onClose: () => void
}

const emailSchema = z.object({
  email: z.string().email('Email inválido'),
})

type EmailForm = z.infer<typeof emailSchema>

export function RsvpDialog({ guest, open, onClose }: RsvpDialogProps) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  })

  const handleConfirmAttendance = () => {
    setStep(2)
  }

  const handleEmailSubmit = (data: EmailForm) => {
    setEmail(data.email)
    setStep(3)
  }

  const handleRestrictionToggle = (restriction: string, checked: boolean) => {
    if (restriction === 'ninguna') {
      if (checked) {
        setSelectedRestrictions(['ninguna'])
      } else {
        setSelectedRestrictions([])
      }
    } else {
      if (checked) {
        setSelectedRestrictions(prev => 
          prev.filter(r => r !== 'ninguna').concat(restriction)
        )
      } else {
        setSelectedRestrictions(prev => 
          prev.filter(r => r !== restriction)
        )
      }
    }
  }

  const handleFinalConfirmation = async () => {
    if (!guest) return

    setLoading(true)
    try {
      const response = await fetch('/api/rsvp/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestId: guest.id,
          email,
          dietaryRestrictions: selectedRestrictions,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Error al confirmar')
        return
      }

      router.push('/gracias')
    } catch (error) {
      console.error('Error confirming RSVP:', error)
      alert('Error al confirmar')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setEmail('')
    setSelectedRestrictions([])
    emailForm.reset()
    onClose()
  }

  if (!guest) return null

  const dietaryOptions = [
    { value: 'ninguna', label: 'Ninguna' },
    { value: 'celiaco', label: 'Celíaco / Sin gluten' },
    { value: 'vegano', label: 'Vegano' },
    { value: 'vegetariano', label: 'Vegetariano' },
    { value: 'frutos-secos', label: 'Alergia a frutos secos' },
    { value: 'mariscos', label: 'Alergia a mariscos' },
    { value: 'diabetes', label: 'Diabetes (sin azúcar)' },
  ]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>¡Hola {guest.firstName}!</DialogTitle>
              <DialogDescription className="text-center">
                El matrimonio es el 20 de febrero. ¿Confirmas tu participación?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-4">
              <Button onClick={handleConfirmAttendance} size="lg">
                Sí
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Tu email</DialogTitle>
              <DialogDescription>
                Ingresa tu email para recibir información del matrimonio
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  {...emailForm.register('email')}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Continuar
              </Button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle>Restricciones alimentarias</DialogTitle>
              <DialogDescription>
                Selecciona todas las que correspondan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {dietaryOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedRestrictions.includes(option.value)}
                    onCheckedChange={(checked) => 
                      handleRestrictionToggle(option.value, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <Button 
              onClick={handleFinalConfirmation} 
              className="w-full mt-4"
              disabled={loading}
            >
              {loading ? 'Confirmando...' : 'Confirmar participación'}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}