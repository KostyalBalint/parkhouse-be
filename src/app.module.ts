import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Config } from './config/config';
import { HealthModule } from './health/health.module';
import { CarModule } from './modules/car/car.module';
import { LevelModule } from './modules/level/level.module';
import { ParkingSpaceModule } from './modules/parking-space/parking-space.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { UserModule } from './modules/user/user.module';
import { TokenService } from './token/token.service';
import { ResignationModule } from './modules/resignation/resignation.module';
import { createContext } from './graphql/createContext';

@Module({
  imports: [
    HealthModule,
    Config,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context: createContext,
    }),
    CarModule,
    LevelModule,
    ParkingSpaceModule,
    ReservationModule,
    UserModule,
    ResignationModule,
  ],
  providers: [TokenService],
})
export class AppModule {}
