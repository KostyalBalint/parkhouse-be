import { Module } from '@nestjs/common';
import { LevelResolver } from './level.resolver';
import { LevelService } from './level.service';
import { PrismaService } from '../../prisma/PrismaService';

@Module({
  providers: [LevelResolver, LevelService, PrismaService],
})
export class LevelModule {}
