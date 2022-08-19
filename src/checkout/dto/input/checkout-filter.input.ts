import { Field, InputType } from '@nestjs/graphql';
import { CheckoutStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

@InputType()
export class CheckoutFilterInput {
  @Field(() => CheckoutStatus, { nullable: true })
  @IsEnum(CheckoutStatus)
  status?: CheckoutStatus;
}
