import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getCarsByUserId(id: string) {
    const cars = await this.prismaService.user
      .findUnique({ where: { id } })
      .cars();
    if (!cars) {
      throw new NotFoundException('Cars not found');
    }
    return cars;
  }

  async getParkingSpaceByUserId(id: string) {
    const parkingSpace = await this.prismaService.user
      .findUnique({ where: { id } })
      .ParkingSpace();
    if (!parkingSpace) {
      throw new NotFoundException('Parking space not found');
    }
    return parkingSpace;
  }
}
