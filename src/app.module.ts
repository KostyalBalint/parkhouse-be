import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Config } from './config/config';
import { HealthModule } from './health/health.module';
import { CarModule } from './modules/car/car.module';
import { LevelModule } from './modules/level/level.module';
import { ParkingSpaceService } from './modules/parking-space/parking-space.service';
import { ParkingSpaceResolver } from './modules/parking-space/parking-space.resolver';
import { UserService } from './modules/user/user.service';
import { UserResolver } from './modules/user/user.resolver';
import { ReservationResolver } from './modules/reservation/reservation.resolver';
import { ReservationService } from './modules/reservation/reservation.service';
import { PrismaService } from './prisma/PrismaService';
import { ParkingSpaceModule } from './modules/parking-space/parking-space.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { UserModule } from './modules/user/user.module';

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
    ParkingSpaceModule,
    ReservationModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
