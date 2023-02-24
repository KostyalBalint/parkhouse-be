import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Config } from './config/config';
import { HealthModule } from './health/health.module';
import { CarModule } from './modules/car/car.module';
import { LevelModule } from './modules/level/level.module';
import { ParkingSpaceService } from './modules/parking-space/parking-space.service';
import { ParkingSpaceResolver } from './modules/parking-space/parking-space.resolver';

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
  providers: [ParkingSpaceService, ParkingSpaceResolver],
})
export class AppModule {}
