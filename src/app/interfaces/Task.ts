export interface ITask {
    taskID: number;
    taskName: string;
    priority: number;
    parentTaskName: string;
    startDate: Date;
    endDate: Date;
}