export interface ITask {
    taskName: string;
    priority: number;
    parentTaskName: string;
    startDate: Date;
    endDate: Date;
}