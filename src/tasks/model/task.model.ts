export interface Task {
  title: string;
  description: string;
  startDate?: Date;
  deadline?: Date;
  status: TaskStatus;
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}
