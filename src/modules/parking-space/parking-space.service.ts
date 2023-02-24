import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class ParkingSpaceService {
  constructor(private readonly prismaService: PrismaService) {}
  async getParkingSpaceById(id: string) {
    const parkingSpace = await this.prismaService.parkingSpace.findUnique({
      where: { id },
    });
    if (!parkingSpace) {
      throw new NotFoundException('Parking space not found');
    }
    return parkingSpace;
  }

  async getLevelByParkingSpaceId(id: string) {
    const level = await this.prismaService.parkingSpace
      .findUnique({ where: { id } })
      .level();
    if (!level) {
      throw new NotFoundException('Level not found');
    }
    return level;
  }

  async getOwnerByParkingSpaceId(id: string) {
    const owner = await this.prismaService.parkingSpace
      .findUnique({ where: { id } })
      .owner();
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }
    return owner;
  }
}
