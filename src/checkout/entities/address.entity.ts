import { Field, ObjectType } from '@nestjs/graphql';
import { Country } from './country.entity';

@ObjectType()
export class Address {
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

  @Field(() => Country, { nullable: false })
  country!: Country;

  @Field(() => String, { nullable: true })
  phone!: string | null;

  @Field(() => String, { nullable: true })
  companyName!: string | null;

  @Field(() => String, { nullable: true })
  vatNumber!: string | null;
}
