import { Test, TestingModule } from '@nestjs/testing';
import { ResignationResolver } from './resignation.resolver';

describe('ResignationResolver', () => {
  let resolver: ResignationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResignationResolver],
    }).compile();

    resolver = module.get<ResignationResolver>(ResignationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
