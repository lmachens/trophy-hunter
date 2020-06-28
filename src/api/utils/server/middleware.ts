import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import { initMongoDatabase } from './db';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
type Middleware = (handler: Handler) => Handler;

export const applyMiddleware = (
  handler: Handler,
  ...middlewares: Middleware[]
) => {
  const reversedMiddlewares = [...middlewares].reverse();
  const combinedHandler = reversedMiddlewares.reduce(
    (newHandler, middleware) => {
      return middleware(newHandler);
    },
    handler
  );
  return combinedHandler;
};

export const withError = (handler: Handler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error: ' + error.message);
  }
};

const ajv = new Ajv();
// eslint-disable-next-line @typescript-eslint/ban-types
export const withSchema = (schema: string | boolean | object) => (
  handler: Handler
) => async (req: NextApiRequest, res: NextApiResponse) => {
  const valid = ajv.validate(schema, req.body);

  if (!valid) {
    return res.status(422).json(ajv.errors);
  }
  return await handler(req, res);
};

type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export const withMethods = (...allowedMethods: HTTPMethod[]) => (
  handler: Handler
) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.origin?.startsWith('https://content.overwolf.com')) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.setHeader(
      'Access-Control-Allow-Methods',
      ['OPTIONS', ...allowedMethods].join(', ')
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.end();
  }
  if (!allowedMethods.find((method) => method === req.method)) {
    return res.status(405).end('Method not allowed');
  }

  await handler(req, res);
};

export const withDatabase = (handler: Handler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await initMongoDatabase();

  return await handler(req, res);
};
