"use client";

import { TaskList } from "@/components/TaskList";
import { createTask, fetchTasks } from "@/lib/tasks.api";
import { CreateTaskInput, Task, TaskPriority, TaskStatus } from "@/types/types";
import {
  useCopilotReadable,
  useFrontendTool,
  useHumanInTheLoop,
} from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useEffect, useState } from "react";
import "@copilotkit/react-ui/styles.css";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getTasks() {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  useCopilotReadable({
    description: "The list of tasks currently managed by the user",
    value: tasks,
  });

  useFrontendTool({
    name: "createTask",
    description: "Create a new task with the given details",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the task",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "The description of the task",
        required: true,
      },
      {
        name: "priority",
        type: "string",
        description: "The priority of the task (low, medium, high)",
        required: true,
      },
      {
        name: "status",
        type: "string",
        description: "The status of the task (todo, in_progress, done)",
        required: true,
      },
    ],

    handler: async ({ title, description, priority, status }) => {
      let finalArgs: CreateTaskInput = {
        title: title || "Demi Title",
        description,
        priority: (priority || "low") as TaskPriority,
        status: (status || "todo") as TaskStatus,
      };

      try {
        await createTask(finalArgs);
        await getTasks();
      } catch (error) {
        console.error("Error creating task:", error);
      }
    },
  });

  useHumanInTheLoop({
    name: "collectTaskFields",
    description: "Collect task fields from the user before creating a task",
    parameters: [
      {
        name: "requiredFields",
        type: "string[]",
        description: "Fields that must be collected",
        required: true,
      },
    ],

    render: ({ args, respond }) => {
      const [title, setTitle] = useState<string>("");
      const [description, setDescription] = useState<string>("");
      const [priority, setPriority] = useState<TaskPriority>("medium");
      const [status, setStatus] = useState<TaskStatus>("todo");

      if (args.requiredFields?.length && respond) {
        return (
          <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Create New Task
            </h3>

            <div className="flex flex-col gap-4">
              {args.requiredFields?.includes("title") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Title
                  </label>
                  <input
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              )}

              {args.requiredFields?.includes("description") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              )}

              {args.requiredFields?.includes("priority") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as TaskPriority)
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              )}

              {args.requiredFields?.includes("status") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              )}

              <button
                onClick={() =>
                  respond({
                    title,
                    description,
                    priority,
                  })
                }
                className="w-full mt-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200"
              >
                Create Task
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <>
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto" />
          </>
        );
      }
    },
  });

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Tasks
              </h1>
              <p className="text-gray-600">
                Manage and organize your tasks efficiently
              </p>
            </div>
            {loading ? (
              <div>
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto" />
              </div>
            ) : (
              <TaskList tasks={tasks} load={getTasks} />
            )}
          </div>

          <div className="lg:col-span-1">
            <CopilotPopup
              instructions={`
                You are an embedded, context-aware task management copilot. And, you need to help the user be more productive with their tasks with the most relevant and useful suggestions.

                Your responsibilities:
                - Summarize active tasks
                - Suggest priorities when helpful
                - Breakdown vague tasks into smaller actioanlbe steps
                - Help the user think through their work
                
                You have TWO modes of operation:

                  1. Thinking & reasoning (NO tools required):
                    - Summarize active tasks
                    - Suggest priorities
                    - Break vague or high-level tasks into actionable steps
                    - Explain plans and reasoning in plain text

                  2. Actions (tools required):
                    - Create tasks

                Guidelines:
                - Be concise
                - Focus on clarity and usefulness
                - When someone asks for breakdown, provide a list of actionable steps using LLM as a brain. You do not need to create them, you just need to show the breakdown. You do not need tools for this.
                - When someone asks for summary, provide a brief summary of active tasks using LLM as a brain
                Important:
                - Breaking down tasks is a THINKING exercise, not a CRUD action.
                - You do NOT need a tool or action to break down tasks.
                - Only create or modify tasks if explicitly asked.
                - Never refuse a breakdown or planning request.
              `}
              labels={{
                title: "Task Copilot",
                initial: "Hi! How can I assist you with your tasks today?",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
