import { NextApiRequest, NextApiResponse } from 'next';

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

export const check = (field, validator, options) => body => {
  try {
    if (!validator(body[field], options)) {
      return {
        [field]: false
      };
    }
  } catch (error) {
    return {
      [field]: error.message
    };
  }
};

export const withValidate = (...checks) => (handler: Handler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const errors = checks.reduce((errors, check) => {
    const error = check(req.body);
    if (!error) {
      return errors;
    }
    return [...errors, error];
  }, []);
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }
  return await handler(req, res);
};

export const withError = (handler: Handler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
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
  if (!allowedMethods.find(method => method === req.method)) {
    return res.status(405).end('Method not allowed');
  }

  await handler(req, res);
};
