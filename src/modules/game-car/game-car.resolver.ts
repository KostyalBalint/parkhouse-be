import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GameCarService } from './game-car.service';
import { GameCar } from '../../graphql/graphqlTypes';
import { ApplicationContext } from '../../graphql/createContext';
import { ApolloError } from 'apollo-server-express';

@Resolver('GameCar')
export class GameCarResolver {
  constructor(private readonly gameCarService: GameCarService) {}
  @Query('gameCars')
  async gameCars() {
    return await this.gameCarService.findAll();
  }

  @Mutation('buyGameCar')
  async buyGameCar(
    @Args('gameCarId') gameCarId: string,
    @Context() context: ApplicationContext,
  ) {
    const userId = context.token?.user.id;
    if (!userId) {
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    }

    return await this.gameCarService.buyGameCar(gameCarId, userId);
  }

  @Mutation('selectGameCar')
  async selectGameCar(
    @Args('gameCarId') gameCarId: string,
    @Context() context: ApplicationContext,
  ) {
    const userId = context.token?.user.id;
    if (!userId) {
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    }

    return await this.gameCarService.selectGameCar(gameCarId, userId);
  }

  @ResolveField('ownedByMe')
  async getOwned(
    @Parent() gameCar: GameCar,
    @Context() context: ApplicationContext,
  ) {
    const userId = context.token?.user.id;
    if (!userId) {
      return false;
    }
    return await this.gameCarService.isGameCarOwnedByUser(gameCar.id, userId);
  }
}
