export class CreateTaskDto {
  title: string;
  description: string;
  startDate?: Date;
  deadline?: Date;
}
