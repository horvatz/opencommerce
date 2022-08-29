import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();

  const hash = await argon.hash('root');

  const user = await prisma.user.create({
    data: {
      email: 'root@root.com',
      firstName: 'root',
      lastName: 'root',
      password: hash,
    },
  });

  const country = await prisma.country.create({
    data: {
      name: 'Slovenia',
      code: 'SI',
    },
  });

  const product = await prisma.product.create({
    data: {
      name: 'T-Shirt',
      description: 'Great T-Shirt',
      variants: {
        create: [
          {
            name: 'Black color',
            description: 'Great color',
            sku: 'SKU-001',
            price: 10.99,
          },
        ],
      },
    },
  });

  console.log(country);
  console.log(product);
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
