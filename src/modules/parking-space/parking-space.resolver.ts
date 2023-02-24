import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ParkingSpaceService } from './parking-space.service';
import { ParkingSpace } from '../../graphql/graphqlTypes';

@Resolver('ParkingSpace')
export class ParkingSpaceResolver {
  constructor(private readonly parkingSpaceService: ParkingSpaceService) {}
  @Query('parkingSpace')
  async parkingSpace(@Args('id') id: string) {
    return await this.parkingSpaceService.getParkingSpaceById(id);
  }

  @ResolveField('level')
  async getLevel(@Parent() parkingSpace: ParkingSpace) {
    return await this.parkingSpaceService.getLevelByParkingSpaceId(
      parkingSpace.id,
    );
  }

  @ResolveField('owner')
  async getOwner(@Parent() parkingSpace: ParkingSpace) {
    return await this.parkingSpaceService.getOwnerByParkingSpaceId(
      parkingSpace.id,
    );
  }
}
