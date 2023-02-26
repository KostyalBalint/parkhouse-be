import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';
import { ReservationStatus, ReservationType } from '../../graphql/graphqlTypes';

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

  async makeReservation(
    date: Date,
    type: ReservationType,
    carId: string,
    userId: string,
  ) {
    const parkingSpaceId = (await this.getFreeParkingSpaces(date))[0].id;
    return await this.prismaService.reservation.create({
      data: {
        carId: carId,
        parkingSpaceId: parkingSpaceId,
        date: date,
        type: type,
        userId: userId,
        status: ReservationStatus.CREATED,
      },
    });
  }

  async changeReservationStatus(
    reservationId: string,
    status: ReservationStatus,
  ) {
    //TODO: Check if the user is the owner of the reservation
    return await this.prismaService.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status: status,
      },
    });
  }

  async getReservationById(id: string) {
    const reservation = await this.prismaService.reservation.findUnique({
      where: {
        id: id,
      },
    });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return reservation;
  }

  async getFreeParkingSpaces(date: Date) {
    const parkingSpaces = await this.prismaService.parkingSpace.findMany();
    const reservations = await this.prismaService.reservation.findMany({
      where: { date },
    });
    const resignations = await this.prismaService.resignation.findMany({
      where: { date },
    });
    return parkingSpaces
      .filter(
        (space) =>
          !reservations.some(
            (reservation) => reservation.parkingSpaceId === space.id,
          ),
      )
      .filter(
        (space) =>
          !space.ownerId ||
          resignations.some(
            (resignation) => resignation.parkingSpaceId === space.id,
          ),
      );
  }

  async cancelReservation(reservationId: string) {
    return await this.prismaService.reservation.delete({
      where: {
        id: reservationId,
      },
    });
  }
}
