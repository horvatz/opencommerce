import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaxRatesService } from './tax-rates.service';
import { TaxRate } from './entities/tax-rate.entity';
import { CreateTaxRateInput } from './dto/inputs/create-tax-rate.input';
import { UpdateTaxRateInput } from './dto/inputs/update-tax-rate.input';

@Resolver(() => TaxRate)
export class TaxRatesResolver {
  constructor(private readonly taxRatesService: TaxRatesService) {}

  @Mutation(() => TaxRate)
  createTaxRate(
    @Args('createTaxRateInput') createTaxRateInput: CreateTaxRateInput,
  ) {
    return this.taxRatesService.create(createTaxRateInput);
  }

  @Query(() => [TaxRate], { name: 'taxRates' })
  findAll() {
    return this.taxRatesService.findAll();
  }

  @Query(() => TaxRate, { name: 'taxRate' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taxRatesService.findOne(id);
  }

  @Mutation(() => TaxRate)
  updateTaxRate(
    @Args('id', { type: () => Int }) id: number,
    @Args('taxRate') updateTaxRateInput: UpdateTaxRateInput,
  ) {
    return this.taxRatesService.update(id, updateTaxRateInput);
  }

  @Mutation(() => TaxRate)
  removeTaxRate(@Args('id', { type: () => Int }) id: number) {
    return this.taxRatesService.remove(id);
  }
}
