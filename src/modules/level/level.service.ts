import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class LevelService {
  constructor(private readonly prismaService: PrismaService) {}
  getAll() {
    return [
      {
        id: 1,
        label: 'Level 1',
      },
    ];
  }

  getSpacesByLevelId(id: string) {
    return this.prismaService.level
      .findUnique({ where: { id } })
      .ParkingSpace();
  }
}
