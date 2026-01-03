"use client";

import { useState } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  ClipboardList,
  Flame,
  Zap,
  Leaf,
  Pin,
  CheckCircle,
  Clock,
  Circle,
} from "lucide-react";
import { Task } from "@/types/types";
import { createTask, updateTask, deleteTask } from "@/lib/tasks.api";
import { Modal } from "./Popup";
import { TaskForm } from "./TaskForm";
import { ConfirmDialog } from "./ConfirmationDialog";

export function TaskList({
  tasks,
  load,
}: {
  tasks?: Task[];
  load: () => void;
}) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          badge: "bg-red-500",
          border: "border-red-200",
          icon: <Flame size={12} />,
        };
      case "medium":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          badge: "bg-amber-500",
          border: "border-amber-200",
          icon: <Zap size={12} />,
        };
      case "low":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          badge: "bg-emerald-500",
          border: "border-emerald-200",
          icon: <Leaf size={12} />,
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          badge: "bg-gray-500",
          border: "border-gray-200",
          icon: <Pin size={12} />,
        };
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "done":
        return {
          color: "text-emerald-700",
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          icon: <CheckCircle size={12} />,
        };
      case "in_progress":
        return {
          color: "text-blue-700",
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: <Clock size={12} />,
        };
      case "todo":
        return {
          color: "text-slate-700",
          bg: "bg-slate-50",
          border: "border-slate-200",
          icon: <Circle size={12} />,
        };
      default:
        return {
          color: "text-gray-700",
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: <Circle size={12} />,
        };
    }
  };

  const formatStatus = (status: string) => {
    return status === "in_progress"
      ? "In Progress"
      : status.charAt(0).toUpperCase() + status.slice(1);
  };

  const createTasks = async (data: any) => {
    try {
      setLoading(true);
      await createTask(data);
      setCreateOpen(false);
      load();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTasks = async (data: any) => {
    if (!editTask) return;
    try {
      setLoading(true);
      await updateTask(editTask.id, data);
      setEditTask(null);
      load();
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl px-4">
        <div className="space-y-6">
          {/* Header with Create Button */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Task Board
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {tasks?.length || 0}{" "}
                    {tasks?.length === 1 ? "task" : "tasks"} total
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCreateOpen(true)}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
              <span>New Task</span>
            </button>
          </div>

          {/* Task Grid */}
          <div className="grid grid-cols-1 gap-4">
            {tasks?.length ? (
              tasks?.map((task) => {
                const priorityStyles = getPriorityStyles(task.priority);
                const statusStyles = getStatusStyles(task.status);

                return (
                  <div
                    key={task.id}
                    className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                  >
                    {/* Priority Indicator Strip */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${priorityStyles.badge}`}
                    ></div>

                    <div className="p-6 pl-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {task.title.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                  {task.description}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Status and Priority Badges */}
                          <div className="flex flex-wrap items-center gap-2 mt-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 ${statusStyles.bg} ${statusStyles.color} ${statusStyles.border}`}
                            >
                              <span className="text-base">
                                {statusStyles.icon}
                              </span>
                              {formatStatus(task.status)}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}
                            >
                              <span className="text-base">
                                {priorityStyles.icon}
                              </span>
                              {task.priority.charAt(0).toUpperCase() +
                                task.priority.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditTask(task)}
                            className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                            title="Edit task"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setDeleteId(task.id)}
                            className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                            title="Delete task"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 shadow-lg">
                  <ClipboardList className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No tasks yet
                </h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                  Start organizing your work by creating your first task. Click
                  the button above to get started!
                </p>
                <button
                  onClick={() => setCreateOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Task
                </button>
              </div>
            )}
          </div>

          {/* Create Modal */}
          <Modal
            open={createOpen}
            onClose={() => setCreateOpen(false)}
            title="Create New Task"
          >
            <TaskForm
              onSubmit={async (data) => {
                await createTasks(data);
              }}
              loading={loading}
            />
          </Modal>

          {/* Edit Modal */}
          <Modal
            open={!!editTask}
            onClose={() => setEditTask(null)}
            title="Edit Task"
          >
            {editTask && (
              <TaskForm
                initial={editTask}
                onSubmit={async (data) => {
                  await updateTasks(data);
                }}
                loading={loading}
              />
            )}
          </Modal>

          {/* Delete Confirmation */}
          <ConfirmDialog
            open={!!deleteId}
            message="Are you sure you want to delete this task? This action cannot be undone."
            onCancel={() => setDeleteId(null)}
            onConfirm={async () => {
              if (!deleteId) return;
              await deleteTask(deleteId);
              setDeleteId(null);
              load();
            }}
          />
        </div>
      </div>
    </div>
  );
}
