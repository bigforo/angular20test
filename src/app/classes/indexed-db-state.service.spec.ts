import { TestBed } from '@angular/core/testing';
import exampleHistory from '../../../example-json.json';
import { EXERCISES_ } from './all-exercises.data';
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
    await service.populateFromExampleJson();

    const history = await service.getHistory();
    const historyRecords = await db.history.orderBy('created').reverse().toArray();

    expect(history.length).toBe(exampleHistory.length);
    expect(historyRecords.length).toBe(exampleHistory.length);
    expect(history[0].created instanceof Date).toBeTrue();
    expect(history[0].activities[0].sets[0].time instanceof Date).toBeTrue();
  });

  it('populates exercises into the database', async () => {
    const exercises = await service.getExercises();

    expect(exercises.length).toBe(EXERCISES_.length);
    expect(await db.exercises.get('b1')).toEqual(EXERCISES_.find((exercise) => exercise.id === 'b1'));
  });

  it('gets an exercise by id from the database', async () => {
    const exercise = await service.getExerciseById('b1');

    expect(exercise).toEqual(EXERCISES_.find((item) => item.id === 'b1'));
  });

  it('returns undefined for an unknown exercise id', async () => {
    expect(await service.getExerciseById('unknown')).toBeUndefined();
  });

  it('saves history into the history table', async () => {
    const older = new Session('older session');
    older.created = new Date('2026-07-10T10:00:00.000Z');

    const newer = new Session('newer session');
    newer.created = new Date('2026-07-27T10:00:00.000Z');

    await service.setHistory([older, newer]);

    const historyRecords = await db.history.orderBy('created').reverse().toArray();
    const newerRecord = await db.history.get(newer.created);

    expect(historyRecords.length).toBe(2);
    expect(historyRecords[0].name).toBe('newer session');
    expect(historyRecords[1].name).toBe('older session');
    expect(newerRecord?.name).toBe('newer session');
  });

  it('adds one session into the history table', async () => {
    const session = new Session('single session');
    session.created = new Date('2026-07-28T10:00:00.000Z');
    session.activities = [new Activity('b2')];

    await service.addHistorySession(session);

    const historyRecords = await db.history.orderBy('created').reverse().toArray();
    const savedSession = await db.history.get(session.created);

    expect(historyRecords.length).toBe(1);
    expect(savedSession?.name).toBe('single session');
    expect(savedSession?.activities[0].created instanceof Date).toBeTrue();
  });

  it('deletes the history table', async () => {
    await service.populateFromExampleJson();
    await service.deleteState();

    expect(await db.history.count()).toBe(0);
  });
});

async function resetDatabase(): Promise<void> {
  db.close();
  await db.delete();
  await db.open();
}
