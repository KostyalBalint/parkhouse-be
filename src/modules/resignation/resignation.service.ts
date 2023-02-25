import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class ResignationService {
  constructor(private readonly prismaService: PrismaService) {}
  getResignationsByUserId(userId: string) {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .Resignation();
  }

  async makeResignation(userId: string, date: Date) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        ParkingSpace: true,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.ParkingSpace) {
      throw new Error('User does not have a parking space');
    }

    await this.prismaService.resignation.create({
      data: {
        date,
        user: {
          connect: {
            id: userId,
          },
        },
        parkingSpace: {
          connect: {
            id: user.ParkingSpace.id,
          },
        },
      },
    });
    return true;
  }

  async cancelResignation(userId: string, date: Date) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        ParkingSpace: true,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.ParkingSpace) {
      throw new Error('User does not have a parking space');
    }

    //TODO: Check if the parking space is reserved for someone else on that day

    await this.prismaService.resignation.deleteMany({
      where: {
        userId: userId,
        date: date,
      },
    });
    return true;
  }
}
