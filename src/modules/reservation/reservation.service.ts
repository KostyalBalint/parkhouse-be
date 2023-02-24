import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  getReservationsByUserId(id: string) {
    return this.prismaService.reservation.findMany({
      where: {
        userId: id,
      },
    });
  }

  async getUserByReservationId(id: string) {
    const user = await this.prismaService.reservation
      .findUnique({ where: { id } })
      .user();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getParkingSpaceByReservationId(id: string) {
    const parkingSpace = await this.prismaService.reservation
      .findUnique({ where: { id } })
      .parkingSpace();

    if (!parkingSpace) {
      throw new NotFoundException('Parking space not found');
    }
    return parkingSpace;
  }

  async getCarByReservationId(id: string) {
    const car = await this.prismaService.reservation
      .findUnique({ where: { id } })
      .car();
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }
}
