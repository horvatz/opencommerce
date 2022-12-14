import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth-guard';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutItemArgs } from './dto/args/create-checkout-item.args';
import { FindAllCheckoutsArgs } from './dto/args/find-all-checkouts.args';
import { FindCheckoutItemArgs } from './dto/args/find-checkout-item.args';
import { FindCheckoutArgs } from './dto/args/find-checkout.args';
import { UpdateCheckoutAddressArgs } from './dto/args/update-checkout-address.args';
import { UpdateCheckoutEmailPhoneArgs } from './dto/args/update-checkout-email-phone.args';
import { UpdateCheckoutStatusArgs } from './dto/args/update-checkout-status.args';
import { UpdatePaymentMethodArgs } from './dto/args/update-payment-method.args';
import { UpdateShippingMethodArgs } from './dto/args/update-shipping-method.args';
import { Checkout } from './entities/checkout.entity';

@Resolver(() => Checkout)
export class CheckoutResolver {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Mutation(() => Checkout)
  checkoutCreate() {
    return this.checkoutService.create();
  }

  // Returns only completed checkouts
  @Query(() => [Checkout], { name: 'checkouts' })
  @UseGuards(GqlAuthGuard)
  findAll(@Args() findAllCheckoutsArgs: FindAllCheckoutsArgs) {
    return this.checkoutService.findAll(findAllCheckoutsArgs);
  }

  // Returns only completed checkouts
  @Query(() => Checkout, { name: 'completedCheckout' })
  @UseGuards(GqlAuthGuard)
  findCompletedCheckout(@Args() findCheckoutArgs: FindCheckoutArgs) {
    return this.checkoutService.findCompletedCheckout(findCheckoutArgs);
  }

  // Returns not completed checkouts
  @Query(() => Checkout, { name: 'checkout' })
  findCheckout(@Args() findCheckoutArgs: FindCheckoutArgs) {
    return this.checkoutService.findOne(findCheckoutArgs);
  }

  @Mutation(() => Checkout)
  checkoutItemAdd(@Args() createCheckoutItemArgs: CreateCheckoutItemArgs) {
    return this.checkoutService.addCheckoutItem(createCheckoutItemArgs);
  }

  @Mutation(() => Checkout)
  checkoutItemUpdate(@Args() updateCheckoutItemArgs: CreateCheckoutItemArgs) {
    return this.checkoutService.updateCheckoutItem(updateCheckoutItemArgs);
  }

  @Mutation(() => Checkout)
  checkoutItemRemove(@Args() removeCheckoutItemArgs: FindCheckoutItemArgs) {
    return this.checkoutService.removeCheckoutItem(removeCheckoutItemArgs);
  }

  @Mutation(() => Checkout)
  checkoutEmailAndPhoneUpdate(
    @Args() updateCheckoutEmailPhoneArgs: UpdateCheckoutEmailPhoneArgs,
  ) {
    return this.checkoutService.emailAndPhoneUpdate(
      updateCheckoutEmailPhoneArgs,
    );
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
  checkoutShippingMethodUpdate(
    @Args() updateShippingMethodArgs: UpdateShippingMethodArgs,
  ) {
    return this.checkoutService.shippingMethodUpdate(updateShippingMethodArgs);
  }

  @Mutation(() => Checkout)
  checkoutPaymentMethodUpdate(
    @Args() updatePaymentMethodArgs: UpdatePaymentMethodArgs,
  ) {
    return this.checkoutService.paymentMethodUpdate(updatePaymentMethodArgs);
  }

  @Mutation(() => Checkout)
  @UseGuards(GqlAuthGuard)
  checkoutStatusUpdate(
    @Args() updateCheckoutStatusArgs: UpdateCheckoutStatusArgs,
  ) {
    return this.checkoutService.statusUpdate(updateCheckoutStatusArgs);
  }

  @Mutation(() => Checkout)
  checkoutComplete(@Args() completeCheckoutArgs: FindCheckoutArgs) {
    return this.checkoutService.complete(completeCheckoutArgs);
  }
}
