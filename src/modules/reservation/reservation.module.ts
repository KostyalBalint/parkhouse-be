import { Module } from '@nestjs/common';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';
import { PrismaService } from '../../prisma/PrismaService';

@Module({
  providers: [ReservationResolver, ReservationService, PrismaService],
})
export class ReservationModule {}
