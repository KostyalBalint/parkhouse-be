import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResignationService } from './resignation.service';
import { ApplicationContext } from '../../graphql/createContext';
import { ApolloError } from 'apollo-server-express';

@Resolver('Resignation')
export class ResignationResolver {
  constructor(private readonly resignationService: ResignationService) {}

  @Query('myResignation')
  async myResignation(@Context() context: ApplicationContext) {
    const userId = context.token?.user.id;
    if (!userId)
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    return await this.resignationService.getResignationsByUserId(userId);
  }

  @Mutation('makeResignation')
  async makeResignation(
    @Args('date') date: Date,
    @Context() context: ApplicationContext,
  ) {
    const userId = context.token?.user.id;
    if (!userId)
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    return await this.resignationService.makeResignation(userId, date);
  }

  @Mutation('cancelResignation')
  async cancelResignation(
    @Args('date') date: Date,
    @Context() context: ApplicationContext,
  ) {
    const userId = context.token?.user.id;
    if (!userId)
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    return await this.resignationService.cancelResignation(userId, date);
  }
}
