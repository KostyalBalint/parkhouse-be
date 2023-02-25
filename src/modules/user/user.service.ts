import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';
import { LoginResponse } from '../../graphql/graphqlTypes';
import { PartialDeep } from 'type-fest';
import { TokenService } from '../../token/token.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}
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

  async login(
    userName: string,
    password: string,
  ): Promise<PartialDeep<LoginResponse>> {
    const user = await this.prismaService.user.findUnique({
      where: {
        name: userName,
      },
    });

    //TODO: NEVER EVER STORE PLAIN TEXT PASSWORD IN PRODUCTION, ONLY FOR DEMO PURPOSES
    const isPasswordCorrect = user?.password === password;
    if (!isPasswordCorrect) {
      throw new NotFoundException('Invalid credentials');
    }

    return {
      user: user,
      token: this.tokenService.generateToken(user),
    };
  }

  async hasFixedParkingSpace(id: string) {
    const parkingSpace = await this.prismaService.user
      .findUnique({ where: { id } })
      .ParkingSpace();

    return parkingSpace?.ownerId === id;
  }

  async getOwnedGameCars(userId: string) {
    const gameCars = await this.prismaService.user
      .findUnique({ where: { id: userId } })
      .gameCars();
    if (!gameCars) {
      return [];
    }
    return gameCars;
  }
}
