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
}
