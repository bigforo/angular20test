import { Injectable } from '@angular/core';
import { liveQuery, Observable } from 'dexie';
import exampleHistory from '../../../example-json.json';
import { EXERCISES_ } from './all-exercises.data';
import { db } from './gym-mate-db';
import { Activity, type Exercise, Session, StateInterface } from './state.interface';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbStateService {
  readonly stateChanges = liveQuery(() => this.getState());
  readonly exerciseChanges: Observable<Exercise[]> = liveQuery(async () => {
    await this.populateExercises();
    return db.exercises.toArray();
  });

  async saveState(state: StateInterface): Promise<void> {
    const normalized = this.normalizeState(state);

    await db.transaction('rw', db.current, db.history, async () => {
      await db.current.clear();
      if (normalized.current) {
        await db.current.put(normalized.current);
      }

      await db.history.clear();
      if (normalized.history.length > 0) {
        await db.history.bulkPut(normalized.history);
      }
    });
  }

  async getState(): Promise<StateInterface | null> {
    const [current, historyRecords] = await Promise.all([
      db.current.toCollection().first(),
      db.history.orderBy('created').reverse().toArray(),
    ]);

    if (!current && historyRecords.length === 0) {
      return null;
    }

    return this.normalizeState({
      current: current ? this.normalizeSession(current) : null,
      history: historyRecords.map((session) => this.normalizeSession(session)),
    });
  }

  async getHistory(): Promise<Session[]> {
    const sessions = await db.history.orderBy('created').reverse().toArray();
    return sessions.map((session) => this.normalizeSession(session)).slice(0, 50);
  }

  async getExercises(): Promise<Exercise[]> {
    await this.populateExercises();
    return db.exercises.toArray();
  }

  async getExerciseById(exId: string): Promise<Exercise | undefined> {
    await this.populateExercises();
    return db.exercises.get(exId);
  }

  async populateFromExampleJson(force = false): Promise<void> {
    await this.populateExercises(force);

    const [currentCount, historyCount] = await Promise.all([db.current.count(), db.history.count()]);

    if (!force && (currentCount > 0 || historyCount > 0)) {
      return;
    }

    const history = this.normalizeState({
      current: null,
      history: exampleHistory as unknown as Session[],
    }).history;

    await db.transaction('rw', db.current, db.history, async () => {
      if (force) {
        await db.current.clear();
        await db.history.clear();
      }

      if (history.length > 0) {
        await db.history.bulkPut(history);
      }
    });
  }

  async setHistory(history: Session[]): Promise<void> {
    const current = (await this.getState())?.current ?? null;
    await this.saveState({ current, history });
  }

  async deleteState(): Promise<void> {
    await db.transaction('rw', db.current, db.history, async () => {
      await db.current.clear();
      await db.history.clear();
    });
  }
  // Normalize the entire state to ensure proper date types and limit history to 50 sessions
  normalizeState(state: StateInterface): StateInterface {
    const normalized: StateInterface = {
      ...state,
      current: state.current ? this.normalizeSession(state.current) : state.current,
      history: [...(state.history ?? [])]
        .map((session) => this.normalizeSession(session))
        .sort((a, b) => b.created.getTime() - a.created.getTime())
        .slice(0, 50),
    };

    return normalized;
  }
  // Normalize a session and its activities to ensure proper date types
  private normalizeSession(session: Session): Session {
    return {
      ...session,
      created: new Date(session.created),
      activities: (session.activities ?? []).map((activity) => this.normalizeActivity(activity)),
    };
  }

  private normalizeActivity(activity: Activity): Activity {
    return {
      ...activity,
      created: new Date(activity.created),
      sets: (activity.sets ?? []).map((set) => ({
        ...set,
        time: new Date(set.time),
      })),
    };
  }

  private async populateExercises(force = false): Promise<void> {
    const exerciseCount = await db.exercises.count();

    if (!force && exerciseCount > 0) {
      return;
    }

    await db.transaction('rw', db.exercises, async () => {
      if (force) {
        await db.exercises.clear();
      }

      await db.exercises.bulkPut(EXERCISES_);
    });
  }
}
