import { Injectable } from '@nestjs/common';
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
    return this.prismaService.reservation.findUnique({ where: { id } }).user();
  }

  async getParkingSpaceByReservationId(id: string) {
    return this.prismaService.reservation
      .findUnique({ where: { id } })
      .parkingSpace();
  }

  async getCarByReservationId(id: string) {
    return this.prismaService.reservation.findUnique({ where: { id } }).car();
  }
}
