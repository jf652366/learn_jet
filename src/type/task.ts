export interface Task {
  id: number;
  name: string;
  //经办人 处理器 processor
  processorId: number;
  projectId: number;
  //  任务组
  epicId: number;
  kanbanId: number;
  //bug or task
  typeId: number;
  note: string;
}
