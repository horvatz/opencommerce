import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'T-Shirt',
      description: 'Great T-Shirt',
      productVariants: {
        create: [
          {
            name: 'Black color',
            description: 'Great color',
            sku: 'SKU-001',
          },
        ],
      },
    },
  });

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
