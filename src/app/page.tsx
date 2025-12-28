import { GuestSearch } from '@/components/guest-search'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Cocó & Dani
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Nos casamos el 20 de febrero de 2026
          </p>
          <p className="text-lg text-gray-500">
            Confirma tu participación
          </p>
        </div>
        
        <GuestSearch />
      </div>
    </div>
  )
}
