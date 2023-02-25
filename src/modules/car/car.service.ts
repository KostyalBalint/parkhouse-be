import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../../graphql/graphqlTypes';
import { PartialDeep } from 'type-fest';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}

  async searchByPartialLicencePlate(
    queryString: string,
  ): Promise<PartialDeep<Car | null>[]> {
    return this.prismaService.car.findMany({
      where: {
        licencePlate: {
          contains: queryString,
        },
      },
      take: 10,
    });
  }

  async getUserByCarId(carId: string) {
    const user = this.prismaService.car
      .findUnique({ where: { id: carId } })
      .user();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async addCar(licencePlate: string, userId: string) {
    return await this.prismaService.car.create({
      data: {
        licencePlate: licencePlate,
        userId: userId,
      },
    });
  }

  async removeCar(carId: string, userId: string) {
    const car = await this.prismaService.car.findUnique({
      where: {
        id: carId,
      },
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    if (car.userId !== userId) {
      throw new Error('User does not own this car');
    }
    return await this.prismaService.car.delete({
      where: {
        id: carId,
      },
    });
  }
}
