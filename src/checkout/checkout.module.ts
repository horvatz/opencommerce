import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutResolver } from './checkout.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CheckoutResolver, CheckoutService],
  imports: [PrismaModule],
})
export class CheckoutModule {}
