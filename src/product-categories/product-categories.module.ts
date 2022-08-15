import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesResolver } from './product-categories.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProductCategoriesResolver, ProductCategoriesService],
  imports: [PrismaModule],
})
export class ProductCategoriesModule {}
