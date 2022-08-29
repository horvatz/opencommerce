import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { FindUniqueUserInput } from './dto/inputs/find-unique-user.input';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hash = await argon.hash(createUserInput.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: createUserInput.email,
          firstName: createUserInput.firstName,
          lastName: createUserInput.lastName,
          password: hash,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // If duplicated entry is created throw exception
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where: {} });
    return users;
  }

  async findOne(findUniqueUserInput: FindUniqueUserInput) {
    const { email, password } = findUniqueUserInput;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    // If user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // Compare hashed password with the one in the db
    const passwordMatch = await argon.verify(user.password, password);

    // If password does not match throw exception
    if (!passwordMatch) throw new ForbiddenException('Credentials incorrect');

    return user;
  }

  // For internal use
  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    try {
      const user = this.prisma.user.update({
        where: { id },
        data: updateUserInput,
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid user ID');
        }
        throw error;
      }
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = this.prisma.user.delete({
        where: { id },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid user ID');
        }
        throw error;
      }
    }
  }
}
