import jwt from 'jsonwebtoken';
import { Config } from '../config/config';
import { ApolloError } from 'apollo-server-express';
import { Token } from '../token/token.service';
import { Request } from 'express';

export type ApplicationContext = {
  req: Express.Request;
  token: Token | null;
};

export const createContext = ({
  req,
}: {
  req: Request;
}): ApplicationContext => {
  const config = new Config();

  if (!req.headers.authorization) {
    return {
      req,
      token: null,
    };
  }

  const reqToken = req.headers.authorization.replace('Bearer ', '');

  try {
    jwt.verify(reqToken, config.jwtSecret);
  } catch (e) {
    throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
  }
  const token = jwt.decode(reqToken, {
    json: true,
  }) as Token;

  return {
    req,
    token,
  };
};
