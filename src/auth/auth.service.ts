import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as argon from 'argon2';
import { CreateAccessTokenInput } from './dto/inputs/create-access-token.input';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwt: JwtService) {}

  async validate(createAcessTokenInput: CreateAccessTokenInput) {
    const { email, password } = createAcessTokenInput;

    const user = await this.userService.findByEmail(email);

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordMatch = await argon.verify(user.password, password);

    if (!passwordMatch) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = 'abc123';

    const token = await this.jwt.sign(payload, { secret: secret });

    return {
      access_token: token,
    };
  }
}
