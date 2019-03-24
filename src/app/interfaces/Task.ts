export interface ITask {
    taskId: string;
    userId: string;
    projectId: string;
    parentTaskId: string;
    task: string;
    status?: string;
    priority: number;
    startDate: string;
    endDate: string;
}

