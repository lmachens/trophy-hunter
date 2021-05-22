import { ObjectID } from 'bson';

export type Mission = {
  _id?: ObjectID;
  active: boolean;
  trophyNames: string[];
  startDate: Date;
};
