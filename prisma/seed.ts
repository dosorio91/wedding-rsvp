import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Crear invitados de ejemplo
  const guests = [
    { firstName: 'María', lastName: 'González' },
    { firstName: 'Carlos', lastName: 'Rodríguez' },
    { firstName: 'Ana', lastName: 'Martínez' },
    { firstName: 'José', lastName: 'López' },
    { firstName: 'Laura', lastName: 'García' },
    { firstName: 'Pedro', lastName: 'Hernández' },
    { firstName: 'Carmen', lastName: 'Jiménez' },
    { firstName: 'Francisco', lastName: 'Ruiz' },
    { firstName: 'Marta', lastName: 'Díaz' },
    { firstName: 'Antonio', lastName: 'Moreno' },
  ]

  console.log('Agregando invitados de ejemplo...')
  
  for (const guest of guests) {
    await prisma.guest.create({
      data: guest,
    })
  }

  console.log('✅ Invitados de ejemplo agregados exitosamente!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })