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
    if (!currentSession) {
      let session = new Session("session");
      session.created = new Date();
      this.appState().current = session;
    }
  }
  public stopSession() {
    if (this.appState().current) {
      let cc = this.appState();
      cc.history.push(this.appState().current as Session);
      cc.current = null;
      this.appState.set(cc);
    }
  }
  public deleteSessionFromHis(session: Session) {
    this.appState().history.splice(this.appState().history.indexOf(session), 1);
    this.save();
  }

  public findActivityByExercise(ex: Exercise):Activity|undefined {
    return this.appState().current?.activities.find(dayExercise =>
      dayExercise.id === ex.id
    );
  }

  public findOrStartActivityByExercise(ex: Exercise) : Activity {
    if (this.appState().current) {
      // Add exercise to daily
      let findActivity = this.findActivityByExercise(ex);

      if (findActivity === undefined) {
        let ss = this.appState();
        const act : Activity = new Activity(ex);
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
    // this.appState.current = null;
  }
  clearHistory() {
    this.appState.set({...this.appState(), history:[]});
    this.save();
  }
  setHistory(history: Session[]) {
    this.appState.set({...this.appState(), history});
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
  createSessionBasedOnOlderSession(session: Session) {
    if (!this.appState().current != null && ((this.appState().current?.activities?.length??0) > 0))
    {
      // await this.router.navigate(['/app/tabs/current']);

      this._snackBar.open("Can't add! Stop current workout session or swipe left to remove exercise!", "Close",{
        duration: 5000,
        verticalPosition: "top"
      });
      return;
    }

    const ses = new Session("session");
    this.appState().current = ses;

    session.activities.forEach(activity => {
      ses.activities.push(new Activity(activity.exercise))
    });
    this.router.navigate(['/app/tabs/current']);
  }


}
