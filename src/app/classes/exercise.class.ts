import {ExerciseSetClass, IExerciseSet} from './exercise-set.class';

export interface IExercise{
  name: string,
  sets?: IExerciseSet [],
  reps: number[]
}

export class ExerciseClass implements IExercise {
  public name: string;
  public sets: ExerciseSetClass[];
  public reps: number[] = [8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  public weight: number[] = [10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
  public time: Date = new Date();
  public noKg: boolean = false;

  constructor(name: string) {
    this.name = name;
    this.sets = [];
    this.visible = true;
  }
  public visible: boolean;
  toggleVisible(): void {
    this.visible = !this.visible;
  }
  addSet(reps: string, kilo: string): void {
    if (this.noKg)
      this.sets.push(new ExerciseSetClass(reps, ""));
    else
      this.sets.push(new ExerciseSetClass(reps, kilo));
  }
  removeSet(index: number | null = null): void {
    if (index == null)
      this.sets.pop();
    else
      this.sets.splice(index, 1);
  }
}

