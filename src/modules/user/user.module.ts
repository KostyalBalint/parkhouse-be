import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/PrismaService';
import { TokenService } from '../../token/token.service';
import { Config } from '../../config/config';

@Module({
  providers: [UserResolver, UserService, PrismaService, TokenService, Config],
})
export class UserModule {}
