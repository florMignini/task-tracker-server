export interface Task {
  title: string;
  description: string;
  startDate?: Date;
  deadline?: Date;
  status: TaskStatus;
}

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}
