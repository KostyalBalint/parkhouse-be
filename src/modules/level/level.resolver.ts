import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Level } from '../../graphql/graphqlTypes';
import { LevelService } from './level.service';

@Resolver('Level')
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Query()
  async map() {
    return this.levelService.getAll();
  }

  @ResolveField()
  async spaces(@Parent() level: Level) {
    return this.levelService.getSpacesByLevelId(level.id);
  }
}
