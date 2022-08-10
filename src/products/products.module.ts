import { Module } from '@nestjs/common';
//import { ProductsService } from './products.service';
//import { ProductsResolver } from './products.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [PrismaModule],
})
export class ProductsModule {}
