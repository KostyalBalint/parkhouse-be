import { Module } from '@nestjs/common';
import { CarResolver } from './car.resolver';
import { CarService } from './car.service';

@Module({
  providers: [CarResolver, CarService]
})
export class CarModule {}
