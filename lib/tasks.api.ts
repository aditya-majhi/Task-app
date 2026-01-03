import { api } from "./axios";
import { CreateTaskInput, Task, UpdateTaskInput } from "../types/types";

export async function fetchTasks(): Promise<Task[]> {
    const res = await api.get<Task[]>("/tasks");
    return res.data;
}

export async function createTask(
    task: CreateTaskInput
) {
    const res = await api.post<Task>("/tasks", task);
    return res.data;
}

export async function updateTask(
    id: string,
    updates: UpdateTaskInput
) {
    const res = await api.patch<Task>(`/tasks/${id}`, updates);
    return res.data;
}

export async function deleteTask(id: string) {
    await api.delete(`/tasks/${id}`);
}
