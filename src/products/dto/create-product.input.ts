import { Field, InputType } from '@nestjs/graphql';
import { ProductType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { TaxRate } from '../entities/tax-rate.entity';

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

  /*@Field(() => [ProductCategory], { nullable: true })
  @Type(() => ProductCategory)
  categories?: Array<ProductCategory>;

  @Field(() => [ProductVariant], { nullable: true })
  variants?: Array<ProductVariant>;

  @Field(() => TaxRate, { nullable: true })
  taxRate?: TaxRate;
  */
}
