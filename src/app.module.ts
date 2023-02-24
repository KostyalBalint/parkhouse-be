import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Config } from './config/config';
import { HealthModule } from './health/health.module';
import { CarModule } from './modules/car/car.module';
import { LevelModule } from './modules/level/level.module';

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
})
export class AppModule {}
