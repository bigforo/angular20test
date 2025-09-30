import {SetClass, IExerciseSet} from './set.class';

export interface IExercise{
  name: string,
  sets?: IExerciseSet [],
  repeatOptions: number[]
}

export interface ExerciseOptions {
  hasWeight?:boolean,
  color?: string,
}

export class ExerciseClass implements IExercise {
  id: string;
  name: string;
  created = new Date();
  hasWeight = true;
  sets: SetClass[] = [];
  repeatOptions = [8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  weightOptions = [5,7.5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
  color: string;
  visible: boolean;

  constructor(name: string, id:string, options:ExerciseOptions = defaultOptions() ) {
    this.id = id;
    this.hasWeight = options.hasWeight ?? true;
    this.name = name;
    this.visible = true;
    this.color = options.color ?? "orange";
  }
  toggleVisible(): void {
    this.visible = !this.visible;
  }
  addSet(reps: string, kilo: string): void {
    if (this.hasWeight)
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

export function defaultOptions(): ExerciseOptions {
  return{
    hasWeight: true,
    color: "orange"
  }
}

