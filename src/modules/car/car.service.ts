import { Injectable } from '@nestjs/common';
import { Car } from '../../graphql/graphqlTypes';
import { PartialDeep } from 'type-fest';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}

  async searchByLicencePlate(licencePlate: string): Promise<PartialDeep<Car>> {
    return this.prismaService.car.findUnique({
      where: {
        licencePlate,
      },
    });
  }

  async getUserByCarId(carId: string) {
    return this.prismaService.car.findUnique({ where: { id: carId } }).user();
  }
}
