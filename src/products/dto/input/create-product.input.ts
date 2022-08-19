import { Field, InputType } from '@nestjs/graphql';
import { ProductType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { FindTaxRateInput } from 'src/tax-rates/dto/inputs/find-tax-rate.input';
import { CreateProductVariantWithProductInput } from '../../../product-variants/dto/input/create-product-variant-with-product.input';
import { FindProductCategoryInput } from './find-product-category.input';

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ProductType, {
    nullable: true,
    description:
      'Type of the product (default is REGULAR), can also be DIGITAL',
  })
  @IsEnum(ProductType)
  type?: ProductType;

  @Field(() => [FindProductCategoryInput], { nullable: false })
  @Type(() => FindProductCategoryInput)
  categories!: Array<FindProductCategoryInput>;

  @Field(() => [CreateProductVariantWithProductInput], { nullable: true })
  @Type(() => CreateProductVariantWithProductInput)
  variants?: Array<CreateProductVariantWithProductInput>;

  @Field(() => FindTaxRateInput, { nullable: true })
  @Type(() => FindTaxRateInput)
  taxRate?: FindTaxRateInput;
}
