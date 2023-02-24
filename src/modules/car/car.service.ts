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
}
