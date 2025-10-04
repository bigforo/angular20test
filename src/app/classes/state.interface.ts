import {SetClass} from './set.class';


export interface StateInterface {
  current?: Session | null,
  history: Session [],
}

export class Session{
  public name: string;
  public activities: Activity[];
  public created: Date;
  // public addExercise(name: Exercise) {
  //   let newEx= new Activity(name);
  //   this.activities.push(newEx);
  //   return newEx;
  // }
  // public addExercise2(exercise: Activity) {
  //   this.activities.push(exercise);
  // }
  // public removeExercise(index: number | null = null) {
  //   if (index == null)
  //     this.activities.pop();
  //   else
  //     this.activities.splice(index, 1);
  // };


  constructor(name: string) {
    this.created = new Date();
    this.name = name;
    this.activities = [];
  }

  toggleVisible(): void {
    this.visibility = !this.visibility;
  }
  visibility: boolean = false;
}

export class Activity  {
  id: string;
  created = new Date();
  sets: SetClass[] = [];
  visible: boolean;
  public readonly exercise : Exercise;

  constructor(exercise : Exercise) {
    this.id = exercise.id;
    this.visible = true;
    this.exercise = exercise;
  }

  get hasSize(){
    return this.exercise.weightOptions.length > 0;
  }
  get date(){
    return this.created.toDateString();
  }
  get time(){
    return this.created.toTimeString();
  }

  toggleVisible(): void {
    this.visible = !this.visible;
  }
  addSet(reps: string, kilo: string = ""): void {
    if (this.hasSize)
      this.sets.push(new SetClass(reps, kilo));
    else
      this.sets.push(new SetClass(reps, ""));

  }
  removeSet(index: number | null = null): void {
    if (index == null)
      this.sets.pop();
    else
      this.sets.splice(index, 1);
  }
}

export interface Exercise{
  id: string,
  name?: string,
  repeatOptions?: number[],
  weightOptions: number[],
  color?:string,
  weightUnit?:string,
  description?:string,
}

export const repeatOptions = [8,9,10,11,12,13,14,15,16,17,18,19,20,21];
export const weightOptions = [5,7.5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];

