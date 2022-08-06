import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CheckoutService } from './checkout.service';
import { CreateOneCheckoutArgs } from 'src/@generated/checkout/create-one-checkout.args';
import { FindUniqueCheckoutArgs } from 'src/@generated/checkout/find-unique-checkout.args';
import { UpdateOneCheckoutArgs } from 'src/@generated/checkout/update-one-checkout.args';
import { Checkout } from 'src/@generated/checkout/checkout.model';

@Resolver(() => Checkout)
export class CheckoutResolver {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Mutation(() => Checkout)
  createCheckout(@Args() createCheckoutInput: CreateOneCheckoutArgs) {
    return this.checkoutService.create(createCheckoutInput);
  }

  @Query(() => [Checkout], { name: 'checkout' })
  findAll() {
    return this.checkoutService.findAll();
  }

  @Query(() => Checkout, { name: 'checkout' })
  findOne(
    @Args()
    findUniqueCheckoutInput: FindUniqueCheckoutArgs,
  ) {
    return this.checkoutService.findOne(findUniqueCheckoutInput);
  }

  @Mutation(() => Checkout)
  updateCheckout(@Args() updateCheckoutInput: UpdateOneCheckoutArgs) {
    return this.checkoutService.update(updateCheckoutInput);
  }

  @Mutation(() => Checkout)
  removeCheckout(@Args() removeCheckoutInput: FindUniqueCheckoutArgs) {
    return this.checkoutService.remove(removeCheckoutInput);
  }
}
