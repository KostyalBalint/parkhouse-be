import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from '../../graphql/graphqlTypes';
import { ApplicationContext } from '../../graphql/createContext';
import { ApolloError } from 'apollo-server-express';

@Resolver('Car')
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Query('searchByLicencePlate')
  async searchByLicencePlate(@Args('licencePlate') queryString: string) {
    return await this.carService.searchByPartialLicencePlate(queryString);
  }

  @Mutation('addCar')
  async addCar(
    @Args('licencePlate') licencePlate: string,
    @Args('name') name: string,
    @Context() context: ApplicationContext,
  ) {
    const userId = context.token?.user.id;
    if (!userId) {
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    }
    return await this.carService.addCar(licencePlate, userId, name);
  }

  @Mutation('updateCar')
  async updateCar(
    @Args('carId') carId: string,
    @Args('licencePlate') licencePlate: string,
    @Args('name') name: string,
    @Context() context: ApplicationContext,
  ) {
    const userId = context.token?.user.id;
    if (!userId) {
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    }
    return await this.carService.updateCar(carId, licencePlate, userId, name);
  }

  @Mutation('removeCar')
  async removeCar(
    @Args('carId') carId: string,
    @Context() context: ApplicationContext,
  ) {
    const userId = context.token?.user.id;
    if (!userId) {
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    }
    await this.carService.removeCar(carId, userId);
    return true;
  }

  @ResolveField('user')
  async getUser(@Parent() car: Car) {
    return await this.carService.getUserByCarId(car.id);
  }
}
