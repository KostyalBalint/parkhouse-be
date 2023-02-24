import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { Config } from '../config/config';
import { User } from '@prisma/client';

export type Token = {
  user: {
    id: string;
    name: string;
  };
};

@Injectable()
export class TokenService {
  constructor(private readonly config: Config) {}

  generateToken(user: User) {
    return jwt.sign(
      {
        user: {
          id: user.id,
          name: user.name,
        },
      },
      this.config.jwtSecret,
      {
        expiresIn: '1d',
      },
    );
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.config.jwtSecret);
  }
}
