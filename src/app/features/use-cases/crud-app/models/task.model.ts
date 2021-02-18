export type TaskInsertModel = Omit<TaskModel, 'id'>;
export type TaskUpdateModel = Partial<Omit<TaskModel, 'id'>>;

export interface TaskModel {
  id: number;
  summary: string;
  author: string;
  status: string;
  start: Date;
  end: Date;
}
