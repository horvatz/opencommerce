import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy, AuthResolver],
  imports: [
    UsersModule,
    JwtModule.register({ secret: 'abc123', signOptions: { expiresIn: '30m' } }),
  ],
})
export class AuthModule {}
