import { Injectable } from '@nestjs/common';
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
    return this.prismaService.level
      .findUnique({ where: { id } })
      .ParkingSpace();
  }
}
