import {SetClass} from './set.class';
import {EXERCISES} from './all-exercises.data';


export interface StateInterface {
  current?: Session | null,
  history: Session [],
}

export class Session{
  public name: string;
  public activities: Activity[];
  public created: Date;
  public note?:string = "";
  public type?:string = "";

  constructor(name: string) {
    this.created = new Date();
    this.name = name;
    this.activities = [];
  }

  visibility: boolean = false;
}

export class Activity  {
  static newActivity(a:Activity): Activity {
    return {
      visible: a.visible,
      id: a.id,
      created: a.created,
      sets: a.sets,
      hasSize: a.hasSize,
      note: a.note,
    }
  }
  id: string;
  created = new Date();
  sets: SetClass[] = [];
  visible: boolean;
  readonly hasSize;
  note: string;

  constructor(exerciseId : string) {
    this.id = exerciseId;
    this.visible = true;
    let exercise = EXERCISES.find(ex => ex.id === exerciseId);
    this.hasSize = exercise?.weightUnit;
    this.note = "";
  }

  static date(created: Date){
    return created.toDateString();
  }
  static time(created: Date){
    return created.toTimeString();
  }

  static unknowActivity(){
    return new Activity("");
  }
  static exerciseById(id:string){
    return EXERCISES.find((x) => x.id == id);
  }
}

export interface Exercise{
  id: string,
  name?: string,
  color?:string,
  weightUnit?:string,
  reps: boolean,
  weight: boolean,
  description?:string,
}

export const repeatOptions = [8,9,10,11,12,13,14,15,16,17,18,19,20,21];
export const weightOptions1 = [0,5,7.5,10,15,17.5,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
export const weightOptions2 = [0,5,7.5,10, 12.5, 15, 17, 22.5, 30, 37.5, 45, 52.5, 60, 67.5, 75, 82.5, 90, 97.5];

