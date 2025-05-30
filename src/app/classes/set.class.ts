export interface IExerciseSet {
  reps: string,
  size?: string,
}

export class SetClass implements IExerciseSet {
  public reps: string;
  public size: string;
  public time: Date = new Date();

  constructor(reps: string, size: string) {
    this.reps = reps;
    this.size = size;
  }
}

