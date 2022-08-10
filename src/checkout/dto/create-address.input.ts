import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CountryInput } from './country.input';

@InputType()
export class CreateAddressInput {
  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: false })
  lastName!: string;

  @Field(() => String, { nullable: false })
  streetAddress!: string;

  @Field(() => String, { nullable: false })
  zipCode!: string;

  @Field(() => String, { nullable: false })
  city!: string;

  @Field(() => CountryInput, {
    nullable: false,
    description: 'Pre-defined country',
  })
  @Type(() => CountryInput)
  country!: CountryInput;

  @Field(() => String, { nullable: true })
  companyName?: string;

  @Field(() => String, { nullable: true })
  vatNumber?: string;
}
