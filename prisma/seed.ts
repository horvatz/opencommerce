import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.country.deleteMany();

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
