import { Module } from '@nestjs/common';
import { ResignationService } from './resignation.service';
import { ResignationResolver } from './resignation.resolver';

@Module({
  providers: [ResignationService, ResignationResolver],
})
export class ResignationModule {}
