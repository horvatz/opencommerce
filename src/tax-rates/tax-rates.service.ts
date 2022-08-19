import { Injectable } from '@nestjs/common';
import { TaxRate } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaxRateInput } from './dto/inputs/create-tax-rate.input';
import { UpdateTaxRateInput } from './dto/inputs/update-tax-rate.input';

@Injectable()
export class TaxRatesService {
  constructor(private prisma: PrismaService) {}

  create(createTaxRateInput: CreateTaxRateInput) {
    return this.prisma.taxRate.create({
      data: createTaxRateInput,
      include: { products: true },
    });
  }

  findAll() {
    return this.prisma.taxRate.findMany({ include: { products: true } });
  }

  async findOne(id: number): Promise<TaxRate> {
    const taxRate = await this.prisma.taxRate.findUnique({ where: { id } });

    if (!taxRate) {
      throw new UserInputError('Invalid tax rate ID');
    }
    return taxRate;
  }

  update(id: number, updateTaxRateInput: UpdateTaxRateInput) {
    try {
      const taxRate = this.prisma.taxRate.update({
        where: { id },
        data: updateTaxRateInput,
      });

      return taxRate;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid tax rate ID');
        }
        throw error;
      }
    }
  }

  remove(id: number) {
    try {
      const taxRate = this.prisma.taxRate.delete({
        where: { id },
      });

      return taxRate;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid tax rate ID');
        }
        throw error;
      }
    }
  }
}
