import { Test, TestingModule } from '@nestjs/testing';
import { GameCarResolver } from './game-car.resolver';

describe('GameCarResolver', () => {
  let resolver: GameCarResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCarResolver],
    }).compile();

    resolver = module.get<GameCarResolver>(GameCarResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
