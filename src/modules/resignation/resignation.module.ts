import { Module } from '@nestjs/common';
import { ResignationService } from './resignation.service';
import { ResignationResolver } from './resignation.resolver';
import { TokenService } from '../../token/token.service';
import { PrismaService } from '../../prisma/PrismaService';
import { Config } from '../../config/config';

@Module({
  providers: [
    ResignationService,
    ResignationResolver,
    PrismaService,
    TokenService,
    Config,
  ],
})
export class ResignationModule {}
