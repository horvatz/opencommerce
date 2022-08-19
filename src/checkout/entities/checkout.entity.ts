import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CheckoutStatus, PaymentMethod } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
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

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Address, { nullable: true })
  shippingAddress?: Address | null;

  @Field(() => Address, { nullable: true })
  billingAddress?: Address | null;

  @Field(() => ShippingMethod, { nullable: true })
  shippingMethod?: ShippingMethod | null;

  @Field(() => PaymentMethod, { nullable: true })
  paymentMethod?: PaymentMethod | null;

  @Field(() => GraphQLDecimal, { nullable: true })
  totalPrice!: Decimal | null;

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
registerEnumType(PaymentMethod, { name: 'PaymentMethod' });
