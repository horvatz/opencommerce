import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductType } from '@prisma/client';
import { ProductCategory } from './product-category.entity';
import { ProductVariant } from './product-variant.entity';
import { TaxRate } from './tax-rate.entity';

@ObjectType()
export class Product {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ProductType, {
    nullable: false,
    defaultValue: ProductType.REGULAR,
  })
  type!: ProductType;

  @Field(() => [ProductCategory], { nullable: true })
  categories?: Array<ProductCategory>;

  @Field(() => [ProductVariant], { nullable: true })
  variants?: Array<ProductVariant>;

  @Field(() => TaxRate, { nullable: true })
  taxRate?: TaxRate;
}

registerEnumType(ProductType, { name: 'ProductType' });
