import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CheckoutService } from './checkout.service';
import { FindCheckoutArgs } from './dto/args/find-checkout.args';
import { UpdateCheckoutAddressArgs } from './dto/args/update-checkout-address.args';
import { Checkout } from './entities/checkout.entity';

@Resolver(() => Checkout)
export class CheckoutResolver {
  constructor(private readonly checkoutService: CheckoutService) {}

  // TODO implement create
  /*@Mutation(() => Checkout)
  createCheckout(@Args() createCheckoutInput: CreateOneCheckoutArgs) {
    return this.checkoutService.create(createCheckoutInput);
  }*/

  @Query(() => Checkout, { name: 'checkout' })
  findCheckout(@Args() findCheckoutArgs: FindCheckoutArgs) {
    return this.checkoutService.findOne(findCheckoutArgs);
  }

  @Mutation(() => Checkout)
  checkoutShippingAddressUpdate(
    @Args() updateCheckoutAddressArgs: UpdateCheckoutAddressArgs,
  ) {
    return this.checkoutService.shippingAddressUpdate(
      updateCheckoutAddressArgs,
    );
  }

  @Mutation(() => Checkout)
  checkoutBillingAddressUpdate(
    @Args() updateCheckoutAddressArgs: UpdateCheckoutAddressArgs,
  ) {
    return this.checkoutService.billingAddressUpdate(updateCheckoutAddressArgs);
  }

  @Mutation(() => Checkout)
  checkoutComplete(@Args() completeCheckoutArgs: FindCheckoutArgs) {
    return this.checkoutService.complete(completeCheckoutArgs);
  }
}
