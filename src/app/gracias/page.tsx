export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          ¡Gracias por confirmar tu participación en nuestro matrimonio!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Nos vemos!
        </p>
        <p className="text-2xl font-semibold text-rose-600">
          Cocó y Dani
        </p>
        
        <div className="mt-12">
          <a 
            href="/"
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Volver al inicio
          </a>
        </div>        
        <p className="text-sm text-gray-500 mt-8 text-center max-w-md mx-auto">
          <strong>Nota:</strong> Recuerda que si fuiste invitado con pareja o familia, debes confirmar a cada uno de los invitados de manera individual.
        </p>      </div>
    </div>
  )
}