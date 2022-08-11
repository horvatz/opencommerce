import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsResolver } from './product-variants.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProductVariantsResolver, ProductVariantsService],
  imports: [PrismaModule],
})
export class ProductVariantsModule {}
