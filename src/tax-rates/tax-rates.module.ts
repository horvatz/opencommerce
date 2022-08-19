import { Module } from '@nestjs/common';
import { TaxRatesService } from './tax-rates.service';
import { TaxRatesResolver } from './tax-rates.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TaxRatesResolver, TaxRatesService],
  imports: [PrismaModule],
})
export class TaxRatesModule {}
