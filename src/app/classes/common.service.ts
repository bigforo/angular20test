import {inject, Injectable, signal} from '@angular/core';
import {Activity, Exercise, Session, StateInterface} from './state.interface';
import {LocalStorageService} from './ls';

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
}
