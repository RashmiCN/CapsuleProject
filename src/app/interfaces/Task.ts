export interface ITask {
    taskID: number;
    userId: number;
    parentId: number;
    projectId: number;
    taskName: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    status: string;
}
export interface IParentTask {
    parentId: number;
    parenttaskName: string;
}
