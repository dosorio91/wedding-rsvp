'use client'

import { useState } from 'react'

export default function RegalosPage() {
  const [copied, setCopied] = useState(false)

  const bankData = `Banco: Banco de Chile
Tipo de Cuenta: Cuenta Vista
Número de Cuenta: 240516901
Titular: Daniel Andrés Osorio Alvarado
Rut: 17.754.181-8
Correo: daniel.osorioalva@gmail.com`

  const copyBankData = async () => {
    try {
      await navigator.clipboard.writeText(bankData)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Tu presencia es el mejor regalo ❤️
        </h1>
        
        <div className="text-lg text-gray-600 mb-8 space-y-4">
          <p>
            Pero si además quieren ayudarnos a construir nuestra vida juntos, pueden hacerlo a través de nuestra lista de regalos o por transferencia.
          </p>
          <p>
            Todo aporte suma y se agradece muchísimo.
          </p>
          <p className="font-semibold">
            ¡Nos vemos para celebrar!
          </p>
        </div>

        <div className="mb-6">
          <a 
            href="https://milistadenovios.cl/enviar-regalo?id=33138"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-12 py-4 rounded-lg transition-colors text-lg font-semibold"
          >
            Lista de Novios
          </a>
        </div>

        <p className="text-gray-600 mb-6">
          Si quieres regalarnos directamente te dejamos nuestros datos de transferencia :)
        </p>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Los datos de transferencia los dejamos a continuación:
            </h2>
            <button
              onClick={copyBankData}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {copied ? '¡Copiado!' : 'Copiar datos'}
            </button>
          </div>
          
          <div className="text-left space-y-2 max-w-sm mx-auto">
            <p><span className="font-semibold">Banco:</span> Banco de Chile</p>
            <p><span className="font-semibold">Tipo de Cuenta:</span> Cuenta Vista</p>
            <p><span className="font-semibold">Número de Cuenta:</span> 240516901</p>
            <p><span className="font-semibold">Titular:</span> Daniel Andrés Osorio Alvarado</p>
            <p><span className="font-semibold">Rut:</span> 17.754.181-8</p>
            <p><span className="font-semibold">Correo:</span> daniel.osorioalva@gmail.com</p>
          </div>
        </div>

        <div className="mt-8">
          <a 
            href="/"
            className="inline-block text-gray-600 hover:text-gray-800 underline"
          >
            Volver al inicio
          </a>
        </div>

        <p className="text-2xl font-semibold text-rose-600 mt-8">
          Cocó y Dani
        </p>
      </div>
    </div>
  )
}