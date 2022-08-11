import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CreateAddressInput } from '../input/create-address.input';

@ArgsType()
export class UpdateCheckoutAddressArgs {
  @Field(() => String, { nullable: false, description: 'ID of the checkout' })
  id!: string;

  @Field(() => CreateAddressInput, {
    nullable: false,
    description: 'Address with pre-defined country',
  })
  @Type(() => CreateAddressInput)
  address!: CreateAddressInput;
}
