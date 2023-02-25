import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Level } from '../../graphql/graphqlTypes';
import { LevelService } from './level.service';

@Resolver('Level')
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Query('levels')
  async levels() {
    return this.levelService.getAll();
  }

  @Query('level')
  async level(@Args('id') id: string) {
    return this.levelService.getById(id);
  }

  @ResolveField()
  async spaces(@Parent() level: Level) {
    return this.levelService.getSpacesByLevelId(level.id);
  }
}
