import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class GameCarService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return await this.prismaService.gameCar.findMany();
  }

  async isGameCarOwnedByUser(id: string, userId: string) {
    const userCars = await this.prismaService.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .gameCars();
    if (!userCars) {
      return false;
    }
    return userCars.some((car) => car.id === id);
  }

  async buyGameCar(gameCarId: string, userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const gameCar = await this.prismaService.gameCar.findUnique({
      where: {
        id: gameCarId,
      },
    });

    if (!gameCar) {
      throw new Error('Game car not found');
    }

    if (user.coin < gameCar.price) {
      throw new Error('Not enough money');
    }

    const newCoin = user.coin - gameCar.price;
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        coin: newCoin,
        gameCars: {
          connect: {
            id: gameCarId,
          },
        },
      },
    });
  }

  async selectGameCar(gameCarId: string, userId: string) {
    const gameCars = await this.prismaService.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .gameCars();

    if (!gameCars) {
      throw new Error('User not found');
    }

    if (!gameCars.some((gameCar) => gameCar.id === gameCarId)) {
      throw new Error('You do not own this car');
    }

    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        selectedGameCarId: gameCarId,
      },
    });
  }
}
