import {inject, Injectable} from '@angular/core';
import {Activity, Exercise, Session, StateInterface} from './state.interface';
import {LocalStorageService} from './ls';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public appState : StateInterface = {
    history: []
  };
  ls = inject(LocalStorageService);

  public startSessionIfNotStarted() {
    let currentSession = this.appState.current;
    if (!currentSession) {
      let session = new Session("session");
      session.created = new Date();
      this.appState.current = session;
    }
  }
  public stopSession() {
    let currentSession = this.appState.current;
    if (currentSession) {
      this.appState.history.push(currentSession);
      this.appState.current = null;
    }
  }

  public startActivity(ex: Exercise) : Activity {
    if(this.appState.current){
      // Add exercise to daily
      let findActivity =
        this.appState.current.activities.find(dayExercise =>
          dayExercise.id === ex.id
        );

      if (findActivity === undefined) {
        const act : Activity = new Activity(ex);
        this.appState.current.activities.push(act);
        return act;
      } else {
        return findActivity;
      }
    }
    throw new Error("Session not started");
  }
  public stopActivity() {}
  public deleteActivity(activity: Activity) {
    this.appState.current?.activities.splice(this.appState.current?.activities.indexOf(activity), 1);
  }

  loadSession(session: Session) {
    this.appState.current = session;
  }

  clearSession() {
    this.appState.current = null;
  }
  clearHistory() {
    this.appState.current = null;
    this.appState.history = [];
    this.save();
  }

  save() {
    // if (this.appState.current?.activities) {
    //   this.ls.setItem("gym-day-session", this.appState.current);
    // }
    this.ls.setItem("gym-day-state", this.appState);
  }
  load(){
    // let session = this.ls.getItem<Session>("gym-day-session");
    // if(session) {
    //   this.loadSession(session);
    // }

    let state = this.ls.getItem<StateInterface>("gym-day-state");
    if (state)
      this.appState = state;
  }
}
