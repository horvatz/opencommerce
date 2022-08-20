import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAccessTokenInput } from './dto/inputs/create-access-token.input';
import { Token } from './entities/token.entity';

@Resolver(() => Token)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token)
  createAccessToken(
    @Args('user') createAcessTokenInput: CreateAccessTokenInput,
  ) {
    return this.authService.validate(createAcessTokenInput);
  }
}
