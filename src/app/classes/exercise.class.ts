import {ExerciseSetClass} from './exercise-set.class';

export class ExerciseClass implements IExercise {
  public name: string;
  public sets: ExerciseSetClass[];
  public visible: boolean;

  constructor(name: string) {
    this.name = name;
    this.sets = [];
    this.visible = true;
  }

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

interface IExercise{
  name: string,
  sets?: ExerciseSetClass [],
  addSet (reps:string,kilo:string): void,
  removeSet(index:number): void,
  toggleVisible(): void,
  visible: boolean,
}
