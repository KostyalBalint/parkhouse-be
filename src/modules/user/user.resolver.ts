import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../../graphql/graphqlTypes';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query('user')
  async getUser(@Args('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Mutation('login')
  async login(
    @Args('userName') userName: string,
    @Args('password') password: string,
  ) {
    return await this.userService.login(userName, password);
  }

  @ResolveField('cars')
  async getCars(@Parent() user: User) {
    return await this.userService.getCarsByUserId(user.id);
  }

  @ResolveField('parkingSpace')
  async getParkingSpace(@Parent() user: User) {
    return await this.userService.getParkingSpaceByUserId(user.id);
  }

  @ResolveField('hasFixedParkingSpace')
  async hasFixedParkingSpace(@Parent() user: User) {
    return await this.userService.hasFixedParkingSpace(user.id);
  }
}
