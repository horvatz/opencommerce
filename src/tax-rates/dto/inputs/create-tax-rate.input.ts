import { InputType, Field } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@InputType()
export class CreateTaxRateInput {
  @Field(() => String, { nullable: false, description: 'Name of tax rate' })
  name!: string;

  @Field(() => String, { nullable: true, description: 'Tax rate description' })
  description?: string;

  @Field(() => GraphQLDecimal, {
    nullable: false,
    description: 'Actual tax rate in deciamsl',
  })
  @Type(() => Decimal)
  rate!: string;
}
