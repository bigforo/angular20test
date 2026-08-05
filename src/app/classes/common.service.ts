import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IndexedDbStateService } from './indexed-db-state.service';
// import { LocalStorageService } from './ls';
import { Activity, Exercise, Session, StateInterface } from './state.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public darkModeOn = signal<boolean>(true);
  public appState = signal<StateInterface>({ history: [] });
  indexedDb = inject(IndexedDbStateService);
  public dbState: Signal<StateInterface | null> = toSignal(this.indexedDb.stateChanges, { initialValue: null });
  public history: Signal<Session[]> = computed(() => this.dbState()?.history ?? []);
  public historyRecord: Signal<Record<string, Session>> = computed(() =>
    Object.fromEntries(this.history().map((session) => [session.created.toISOString(), session]))
  );
  public exercises: Signal<Exercise[]> = toSignal(this.indexedDb.exerciseChanges, { initialValue: [] });
  public exerciseRecord: Signal<Record<string, Exercise>> = computed(() =>
    Object.fromEntries(this.exercises().map((exercise) => [exercise.id, exercise]))
  );

  public startSessionIfNotStarted() {
    const currentSession = this.appState().current;
    if (!currentSession || currentSession.activities.length === 0) {
      const session = new Session('session');
      session.created = new Date();
      this.appState().current = session;
    }
  }
  // TODO save history
  public stopSession() {
    if (this.appState().current) {
      const cc = this.appState();
      cc.history = [...this.history(), this.appState().current as Session];
      // Sort na History by Date Desc... Newest first
      cc.history = [...cc.history].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      cc.current = null;
      this.appState.set(cc);
    }
  }
  public deleteSessionFromHis(session: Session) {
    this.setHistory(this.history().filter((historySession) => historySession !== session));
  }

  // Current Session Activities
  public findActivityByExercise(exerciseId: string): Activity | undefined {
    return this.appState().current?.activities.find((dayExercise) => dayExercise.id === exerciseId);
  }

  public findOrStartActivityByExercise(exerciseId: string): Activity {
    if (this.appState().current) {
      // Add exercise to daily
      const findActivity = this.findActivityByExercise(exerciseId);
      // If not found:
      if (findActivity === undefined || findActivity.id === 'em') {
        const ss = this.appState();
        const act: Activity = new Activity(exerciseId);
        ss.current?.activities.push(act);
        this.appState.set(ss);
        return act;
      } else {
        return findActivity;
      }
    }
    throw new Error('Session not started');
  }

  public deleteActivity(activity: Activity) {
    const cc = this.appState();
    cc.current?.activities.splice(cc.current?.activities.indexOf(activity), 1);
    this.appState.set(cc);
  }

  public addNoteToCurrentSession(note: string) {
    const cc = this.appState();
    if (cc.current) cc.current.note = note;
    this.appState.set(cc);
    this.save();
  }

  public addTypeToCurrentSession(type: string | undefined) {
    const cc = this.appState();
    if (cc.current) cc.current.type = type;
    this.appState.set(cc);
    this.save();
  }

  setHistory(history: Session[]) {
    this.appState.set({ ...this.appState(), history });
    this.save();
  }

  save() {
    const state = this.indexedDb.normalizeState(this.appState());
    this.appState.set(state);
    void this.indexedDb.saveState(state);
  }
  async load() {
    await this.loadFromIndexedDb();
  }

  private async loadFromIndexedDb() {
    const state = await this.indexedDb.getState();
    if (state) {
      this.appState.set(state);
    }
    const exercises = await this.indexedDb.getExercises();
    if (exercises.length === 0) {
      await this.indexedDb.populateFromExampleJson();
    }
  }

  router = inject(Router);
  _snackBar = inject(MatSnackBar);
  createOrUpdateActiveSessionBasedOnOldSession(oldSession: Session) {
    const currentSession = this.appState().current ?? new Session('session');
    let num = 0;
    oldSession.activities.forEach((activity) => {
      // If activity isn't found in currentSession.activities
      if (!currentSession.activities.some((a) => a.id == activity.id)) {
        // Create new activity with same id
        currentSession.activities.push(new Activity(activity.id));
        num++;
      }
    }); //forEach
    if (num == 0) {
      this._snackBar.open(`Activities already active!`, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      this.router.navigate(['/app/tabs/current']);
    }
    if (num > 0) {
      this._snackBar.open(`Copied ${num} exercises!`, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      this.appState().current = currentSession;
      this.router.navigate(['/app/tabs/current']);
    }
    this.save();
  }

  getAllHistoryByActivityId(exId: string) {
    const hist = this.history();
    const foundActivities: Activity[] = [];
    hist.forEach((session) => {
      session.activities.forEach((activity) => {
        if (activity.id == exId) {
          foundActivities.push(activity);
        }
      });
    });
    return [...foundActivities].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  }

  getAllHistoryByActivityIdExtended(exId: string) {
    const hist = this.history();

    const foundActivities: ActivityEx[] = [];
    hist.forEach((session, index) => {
      session.activities.forEach((activity, actInx) => {
        if (activity.id == exId) {
          foundActivities.push({
            sessionHistoryIndexId: index,
            activityNumberInSession: actInx + 1,
            activity: activity,
            prevActivity: actInx == 0 ? null : session.activities[actInx - 1],
            created: activity.created,
          });
        }
      });
    });
    return [...foundActivities].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  }

  diff(time: Date, time1: Date) {
    const d1 = new Date(time.toString());
    const d2 = new Date(time1.toString());
    const diffMs = d1.getTime() - d2.getTime();
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    return minutes;
  }

  getActivitiesExBySession(session: Session | null | undefined) {
    if (session == null || session == undefined) {
      return [];
    }
    const currentActivities: ActivityEx[] = [];
    session.activities?.forEach((activity, index) => {
      currentActivities.push({
        activity: activity,
        prevActivity: index === 0 ? null : session.activities[index - 1],
        sessionHistoryIndexId: null,
        activityNumberInSession: index + 1,
        created: new Date(session.activities[index].created),
      });
    });
    return currentActivities;
  }

  exerciseById(exId: string) {
    // return await this.indexedDb.getExerciseById(exId);
    return this.exercises().find((x) => x.id == exId);
  }
}

export interface ActivityEx {
  sessionHistoryIndexId: number | null;
  activityNumberInSession: number;
  created: Date;
  activity: Activity;
  prevActivity: Activity | null;
}
