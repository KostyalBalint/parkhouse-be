import { Module } from '@nestjs/common';
import { ParkingSpaceService } from './parking-space.service';
import { ParkingSpaceResolver } from './parking-space.resolver';
import { PrismaService } from '../../prisma/PrismaService';

@Module({
  providers: [ParkingSpaceResolver, ParkingSpaceService, PrismaService],
})
export class ParkingSpaceModule {}
