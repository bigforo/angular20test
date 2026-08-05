import Dexie, { type EntityTable } from 'dexie';
import { type Exercise, type Session } from './state.interface';

const db = new Dexie('GymMateDatabase') as Dexie & {
  exercises: EntityTable<Exercise, 'id'>;
  history: EntityTable<Session, 'created'>;
};

db.version(8).stores({
  current: null,
  exercises: 'id',
  history: 'created',
});

export { db };
