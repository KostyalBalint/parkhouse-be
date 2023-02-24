import { Module } from '@nestjs/common';
import { CarResolver } from './car.resolver';
import { CarService } from './car.service';
import { PrismaService } from '../../prisma/PrismaService';

@Module({
  providers: [PrismaService, CarResolver, CarService],
})
export class CarModule {}
