import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { TaxRatesModule } from './tax-rates/tax-rates.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'), // added ../ to get one folder back
      serveRoot: '/uploads/', //last slash was important
    }),
    ConfigModule.forRoot(),
    ProductsModule,
    PrismaModule,
    CheckoutModule,
    ProductVariantsModule,
    ProductCategoriesModule,
    TaxRatesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
