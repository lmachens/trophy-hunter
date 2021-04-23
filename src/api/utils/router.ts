import type { ParsedUrlQuery } from 'node:querystring';

export const normalizeQuery = (query: ParsedUrlQuery) => {
  return Object.entries(query).reduce<NodeJS.Dict<string>>(
    (prev, [key, value]) => ({
      ...prev,
      [key]: Array.isArray(value) ? value[0] : value,
    }),
    {}
  );
};
