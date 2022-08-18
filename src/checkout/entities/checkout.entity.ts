import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CheckoutStatus } from '@prisma/client';
import { Address } from './address.entity';
import { CheckoutItem } from './checkout-item.entity';
import { ShippingMethod } from './shipping-method.entity';

@ObjectType()
export class Checkout {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  note!: string | null;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  completed!: boolean;

  @Field(() => [CheckoutItem], { nullable: true })
  items?: Array<CheckoutItem>;

  @Field(() => Address, { nullable: true })
  shippingAddress?: Address | null;

  @Field(() => Address, { nullable: true })
  billingAddress?: Address | null;

  @Field(() => ShippingMethod, { nullable: true })
  shippingMethod?: ShippingMethod | null;

  @Field(() => CheckoutStatus, {
    nullable: false,
    defaultValue: CheckoutStatus.OPEN,
  })
  status!: CheckoutStatus;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}

registerEnumType(CheckoutStatus, { name: 'CheckoutStatus' });
