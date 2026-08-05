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
  readonly historyChanges: Observable<Session[]> = liveQuery(() => this.getHistory());
  readonly exerciseChanges: Observable<Exercise[]> = liveQuery(async () => {
    return db.exercises.toArray();
  });

  async getHistory(): Promise<Session[]> {
    const sessions = await db.history.orderBy('created').reverse().toArray();
    return sessions.map((session) => this.normalizeSession(session)).slice(0, 30);
  }

  async getExercises(): Promise<Exercise[]> {
    return db.exercises.toArray();
  }

  async getExerciseById(exId: string): Promise<Exercise | undefined> {
    return db.exercises.get(exId);
  }

  async populateFromExampleJson(force = false): Promise<void> {
    await this.populateExercises(force);

    const historyCount = await db.history.count();

    if (!force && historyCount > 0) {
      return;
    }

    const history = this.normalizeHistory(exampleHistory as unknown as Session[]);

    await db.transaction('rw', db.history, async () => {
      if (force) {
        await db.history.clear();
      }

      if (history.length > 0) {
        await db.history.bulkPut(history);
      }
    });
  }

  async setHistory(history: Session[]): Promise<void> {
    const normalized = this.normalizeHistory(history);
    await db.transaction('rw', db.history, async () => {
      await db.history.clear();

      if (normalized.length > 0) {
        await db.history.bulkPut(normalized);
      }
    });
  }

  async addHistorySession(session: Session): Promise<void> {
    await db.history.put(this.normalizeSession(session));
  }

  async deleteState(): Promise<void> {
    await db.transaction('rw', db.history, async () => {
      await db.history.clear();
    });
  }
  normalizeState(state: StateInterface): StateInterface {
    const normalized: StateInterface = {
      ...state,
      current: state.current ? this.normalizeSession(state.current) : state.current,
    };

    return normalized;
  }

  private normalizeHistory(history: Session[]): Session[] {
    return [...history].map((session) => this.normalizeSession(session));
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
