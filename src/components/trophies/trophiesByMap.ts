import * as trophies from '.';

export const allTrophies = Object.values(trophies);
export const aramTrophies = allTrophies.filter((trophy) => trophy.aramSupport);
