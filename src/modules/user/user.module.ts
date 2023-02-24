import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/PrismaService';

@Module({
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
