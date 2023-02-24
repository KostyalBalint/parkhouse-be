import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Config } from './config/config';
import { HealthModule } from './health/health.module';
import { CarModule } from './modules/car/car.module';
import { LevelModule } from './modules/level/level.module';
import { ParkingSpaceService } from './modules/parking-space/parking-space.service';
import { ParkingSpaceResolver } from './modules/parking-space/parking-space.resolver';
import { MyReservationsResolver } from './modules/my-reservations/my-reservations.resolver';
import { MyReservationsService } from './modules/my-reservations/my-reservations.service';
import { ReservationsResolver } from './modules/reservations/reservations.resolver';
import { ReservationsService } from './modules/reservations/reservations.service';

@Module({
  imports: [
    HealthModule,
    Config,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    CarModule,
    LevelModule,
  ],
  providers: [ParkingSpaceService, ParkingSpaceResolver, MyReservationsResolver, MyReservationsService, ReservationsResolver, ReservationsService],
})
export class AppModule {}
