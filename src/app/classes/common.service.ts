import {inject, Injectable, signal} from '@angular/core';
import {Activity, Exercise, Session, StateInterface} from './state.interface';
import {LocalStorageService} from './ls';
import {EXERCISES} from './all-exercises.data';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public darkModeOn = signal<boolean>(true);
  public appState  = signal<StateInterface>({ history: [] });
  ls = inject(LocalStorageService);

  public startSessionIfNotStarted() {
    let currentSession = this.appState().current;
    if (!currentSession || currentSession.activities.length === 0) {
      let session = new Session("session");
      session.created = new Date();
      this.appState().current = session;
    }
  }
  public stopSession() {
    if (this.appState().current) {
      let cc = this.appState();
      cc.history.push(this.appState().current as Session);
      // Sort na History by Date Desc... Newest first
      cc.history = [...cc.history].sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      cc.current = null;
      this.appState.set(cc);
    }
  }
  public deleteSessionFromHis(session: Session) {
    this.appState().history.splice(this.appState().history.indexOf(session), 1);
    this.save();
  }

  public findActivityByExercise(exerciseId: string):Activity|undefined {
    return this.appState().current?.activities.find(dayExercise =>
      dayExercise.id === exerciseId
    );
  }

  public findOrStartActivityByExercise(exerciseId: string) : Activity {
    if (this.appState().current) {
      // Add exercise to daily
      let findActivity = this.findActivityByExercise(exerciseId);
      // If not found:
      if (findActivity === undefined) {
        let ss = this.appState();
        const act : Activity = new Activity(exerciseId);
        ss.current?.activities.push(act);
        this.appState.set(ss);
        return act;
      } else {
        return findActivity;
      }
    }
    throw new Error("Session not started");
  }
  public stopActivity() {}
  public deleteActivity(activity: Activity) {
    let cc = this.appState();
    cc.current?.activities.splice(cc.current?.activities.indexOf(activity), 1);
    this.appState.set(cc);
  }
  public addNoteToCurrentSession(note:string) {
    let cc = this.appState();
    if (cc.current)
      cc.current.note = note;
    this.appState.set(cc);
    this.save();
  }

  public addTypeToCurrentSession(type:string | undefined) {
    let cc = this.appState();
    if (cc.current)
      cc.current.type = type;
    this.appState.set(cc);
    this.save();
  }

  loadSession(session: Session) {
    // this.appState.current = session;
  }

  clearSession() {
    this.appState().current = null;
    this.save();
  }
  clearHistory() {
    this.appState.set({...this.appState(), history:[]});
    this.save();
  }
  setHistory(history: Session[]) {
    this.appState.set({...this.appState(), history:history});
    this.save();
  }

  save() {
    this.ls.setItem("gym-day-state", this.appState());
  }
  load(){
    let state = this.ls.getItem<StateInterface>("gym-day-state");
    if (state){
      this.appState.set(state);
    }

  }
  router = inject(Router);
  _snackBar = inject(MatSnackBar);
  createOrUpdateActiveSessionBasedOnOldSession(oldSession: Session) {

    const currentSession = this.appState().current ?? new Session("session");
    let num = 0;
    oldSession.activities.forEach(activity => {
      // If activity isn't found in currentSession.activities
      if (!currentSession.activities.some(a => a.id == activity.id)){
        // Create new activity with same id
        currentSession.activities.push(new Activity(activity.id));
        num++;
      }
    }); //forEach
    if (num == 0){
      this._snackBar.open(`Activities already active!`, "Close",{
        duration: 3000,
        verticalPosition: "top"
      });
      this.router.navigate(['/app/tabs/current']);
    }
    if (num > 0) {
      this._snackBar.open(`Copied ${num} exercises!`, "Close", {
        duration: 3000,
        verticalPosition: "top"
      });
      this.appState().current = currentSession;
      this.router.navigate(['/app/tabs/current']);
    }
    this.save();
  }
  getHistory(exId: string) {
    let hist = this.appState().history;
    let foundActivities : Activity[] = [];
    hist.forEach(session => {
      session.activities.forEach(activity => {
        if (activity.id == exId) {
          foundActivities.push(activity);
        }
      })
    });
    return [...foundActivities].sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
  }

  getHistoryEx(exId: string) {
    const hist = this.appState().history;

    let foundActivities : ActivityEx[] = [];
    hist.forEach(session => {
      let i = 0;
      session.activities.forEach(activity => {

        if (activity.id == exId) {
          foundActivities.push({
            sessionOrder:i+1,
            activity:activity,
            prevActivity: (i==0 ? null : session.activities[i-1]),
            created:activity.created
          });
        }
        i++;

      })
    });
    return [...foundActivities].sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
  }

  diff(time: Date, time1: Date) {
    const d1 = new Date(time.toString());
    const d2 = new Date(time1.toString());
    const diffMs = d1.getTime() - d2.getTime();
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    return minutes;
  }

  getActivityEx(currentActIndex: number) : ActivityEx {
    return {
      activity: this.appState().current!.activities[currentActIndex],
      prevActivity: this.appState().current!.activities[currentActIndex],
      sessionOrder: currentActIndex + 1,
      created: this.appState().current!.activities[currentActIndex].created
    }
  }

}

export type ActivityEx = {
  sessionOrder:number,
  created:Date,
  activity:Activity,
  prevActivity:Activity | null
}
