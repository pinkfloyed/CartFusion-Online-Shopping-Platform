import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Minimal Sneakers', slug: 'minimal-sneakers', description: 'Comfortable everyday sneakers', price: 6999, stock: 50, image: '' },
      { name: 'Comfy Hoodie', slug: 'comfy-hoodie', description: 'Soft cotton hoodie', price: 4999, stock: 30, image: '' },
      { name: 'Eco Water Bottle', slug: 'eco-water-bottle', description: 'Reusable bottle', price: 1999, stock: 100, image: '' }
    ]
  })

  const adminPass = bcrypt.hashSync('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@cartfusion.test' },
    update: {},
    create: { name: 'Admin', email: 'admin@cartfusion.test', password: adminPass, role: 'admin' }
  })
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
