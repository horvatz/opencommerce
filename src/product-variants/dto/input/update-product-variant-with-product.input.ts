import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductVariantWithProductInput } from './create-product-variant-with-product.input';

@InputType()
export class UpdateProductVariantWithProductInput extends PartialType(
  CreateProductVariantWithProductInput,
) {}
