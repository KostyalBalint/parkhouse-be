import { Module } from '@nestjs/common';
import { GameCarService } from './game-car.service';
import { GameCarResolver } from './game-car.resolver';
import { PrismaService } from '../../prisma/PrismaService';
import { TokenService } from '../../token/token.service';
import { Config } from '../../config/config';

@Module({
  providers: [
    GameCarService,
    GameCarResolver,
    PrismaService,
    TokenService,
    Config,
  ],
})
export class GameCarModule {}
