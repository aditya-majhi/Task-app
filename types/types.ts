export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date?: string;
}

export interface CreateTaskInput {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date?: string;
}

export interface UpdateTaskInput {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: string;
}
