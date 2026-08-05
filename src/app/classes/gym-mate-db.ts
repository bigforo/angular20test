import Dexie, { type EntityTable } from 'dexie';
import { type Exercise, type Session } from './state.interface';

const db = new Dexie('GymMateDatabase') as Dexie & {
  current: EntityTable<Session, 'created'>;
  exercises: EntityTable<Exercise, 'id'>;
  history: EntityTable<Session, 'created'>;
};

db.version(7).stores({
  current: 'created',
  exercises: 'id',
  history: 'created',
});

export { db };
