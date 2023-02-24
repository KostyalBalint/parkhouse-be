import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSpaceResolver } from './parking-space.resolver';

describe('ParkingSpaceResolver', () => {
  let resolver: ParkingSpaceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingSpaceResolver],
    }).compile();

    resolver = module.get<ParkingSpaceResolver>(ParkingSpaceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
