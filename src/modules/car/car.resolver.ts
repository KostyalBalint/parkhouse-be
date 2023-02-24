import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from '../../graphql/graphqlTypes';

@Resolver('Car')
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Query('searchByLicencePlate')
  async searchByLicencePlate(@Args('licencePlate') licencePlate: string) {
    return await this.carService.searchByLicencePlate(licencePlate);
  }

  @ResolveField('user')
  async getUser(@Parent() car: Car) {
    return await this.carService.getUserByCarId(car.id);
  }
}
