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
    return this.prismaService.user.findUnique({ where: { id } }).cars();
  }

  async getParkingSpaceByUserId(id: string) {
    return this.prismaService.user.findUnique({ where: { id } }).ParkingSpace();
  }
}
