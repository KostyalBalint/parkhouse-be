import { Test, TestingModule } from '@nestjs/testing';
import { GameCarService } from './game-car.service';

describe('GameCarService', () => {
  let service: GameCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCarService],
    }).compile();

    service = module.get<GameCarService>(GameCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
