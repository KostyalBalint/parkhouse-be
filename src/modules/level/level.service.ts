import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';
import { Level } from '../../graphql/graphqlTypes';
import { PartialDeep } from 'type-fest';

@Injectable()
export class LevelService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll(): Promise<PartialDeep<Level>[]> {
    return await this.prismaService.level.findMany();
  }

  getSpacesByLevelId(id: string) {
    const parkingSpaces = this.prismaService.level
      .findUnique({ where: { id } })
      .ParkingSpace();
    if (!parkingSpaces) {
      throw new NotFoundException('Level not found');
    }
    return parkingSpaces;
  }

  getById(id: string) {
    const level = this.prismaService.level.findUnique({ where: { id } });
    if (!level) {
      throw new NotFoundException('Level not found');
    }
    return level;
  }
}
