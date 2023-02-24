import { Context, Query, Resolver } from '@nestjs/graphql';
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
    return this.resignationService.getResignationsByUserId(userId);
  }
}
