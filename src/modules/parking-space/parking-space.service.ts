import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/PrismaService';

@Injectable()
export class ParkingSpaceService {
  constructor(private readonly prismaService: PrismaService) {}
  async getParkingSpaceById(id: string) {
    return this.prismaService.parkingSpace.findUnique({ where: { id } });
  }

  async getLevelByParkingSpaceId(id: string) {
    return this.prismaService.parkingSpace
      .findUnique({ where: { id } })
      .level();
  }

  async getOwnerByParkingSpaceId(id: string) {
    return this.prismaService.parkingSpace
      .findUnique({ where: { id } })
      .owner();
  }
}
