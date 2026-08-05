import { TestBed } from '@angular/core/testing';
import exampleHistory from '../../../example-json.json';
import { EXERCISES } from './all-exercises.data';
import { db } from './gym-mate-db';
import { IndexedDbStateService } from './indexed-db-state.service';
import { Activity, Session } from './state.interface';

describe('IndexedDbStateService', () => {
  let service: IndexedDbStateService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDbStateService);
    await resetDatabase();
  });

  afterEach(async () => {
    await resetDatabase();
  });

  it('populates an empty database from example-json history', async () => {
    const state = await service.getState();
    const historyRecords = await db.history.orderBy('created').reverse().toArray();

    expect(state).not.toBeNull();
    expect(state?.current).toBeNull();
    expect(state?.history.length).toBe(exampleHistory.length);
    expect(historyRecords.length).toBe(exampleHistory.length);
    expect(await db.current.count()).toBe(0);
    expect(state?.history[0].created instanceof Date).toBeTrue();
    expect(state?.history[0].activities[0].sets[0].time instanceof Date).toBeTrue();
  });

  it('populates exercises into the database', async () => {
    const exercises = await service.getExercises();

    expect(exercises.length).toBe(EXERCISES.length);
    expect(await db.exercises.get('b1')).toEqual(EXERCISES.find((exercise) => exercise.id === 'b1'));
  });

  it('gets an exercise by id from the database', async () => {
    const exercise = await service.getExerciseById('b1');

    expect(exercise).toEqual(EXERCISES.find((item) => item.id === 'b1'));
  });

  it('returns undefined for an unknown exercise id', async () => {
    expect(await service.getExerciseById('unknown')).toBeUndefined();
  });

  it('saves current and history into separate tables', async () => {
    const current = new Session('current session');
    current.created = new Date('2026-07-28T10:00:00.000Z');
    current.activities = [new Activity('b2')];

    const older = new Session('older session');
    older.created = new Date('2026-07-10T10:00:00.000Z');

    const newer = new Session('newer session');
    newer.created = new Date('2026-07-27T10:00:00.000Z');

    await service.saveState({
      current,
      history: [older, newer],
    });

    const currentRecord = await db.current.get(current.created);
    const historyRecords = await db.history.orderBy('created').reverse().toArray();
    const newerRecord = await db.history.get(newer.created);

    expect(currentRecord?.name).toBe('current session');
    expect(historyRecords.length).toBe(2);
    expect(historyRecords[0].name).toBe('newer session');
    expect(historyRecords[1].name).toBe('older session');
    expect(newerRecord?.name).toBe('newer session');
  });

  it('deletes current and history tables', async () => {
    await service.populateFromExampleJson();
    await service.deleteState();

    expect(await db.current.count()).toBe(0);
    expect(await db.history.count()).toBe(0);
  });
});

async function resetDatabase(): Promise<void> {
  db.close();
  await db.delete();
  await db.open();
}
