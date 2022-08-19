import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductType } from '@prisma/client';
import { ProductCategory } from '../../product-categories/entities/product-category.entity';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';
import { ProductMedia } from './product-media.entity';
import { TaxRate } from '../../tax-rates/entities/tax-rate.entity';

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

  @Field(() => [ProductCategory], { nullable: false })
  categories!: Array<ProductCategory>;

  @Field(() => [ProductVariant], { nullable: true })
  variants?: Array<ProductVariant>;

  @Field(() => [ProductMedia], { nullable: false })
  media?: Array<ProductMedia>;

  @Field(() => TaxRate, { nullable: true })
  taxRate?: TaxRate;
}

registerEnumType(ProductType, { name: 'ProductType' });
