import {ExerciseSetClass, IExerciseSet} from './exercise-set.class';

export interface IExercise{
  name: string,
  sets?: IExerciseSet [],
}

export class ExerciseClass implements IExercise {
  public name: string;
  public sets: ExerciseSetClass[];

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
    this.sets.push(new ExerciseSetClass(reps, kilo));
  }
  removeSet(index: number | null = null): void {
    if (index == null)
      this.sets.pop();
    else
      this.sets.splice(index, 1);
  }
}

