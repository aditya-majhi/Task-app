import { useState } from "react";
import { FileText, AlignLeft, ListTodo, Flag, Loader2 } from "lucide-react";
import { Task, TaskPriority, TaskStatus } from "../types/types";
import { Plus } from "lucide-react";

export function TaskForm({
  initial,
  onSubmit,
  loading,
}: {
  initial?: Partial<Task>;
  onSubmit: (data: any) => void;
  loading: boolean;
}) {
  const [title, setTitle] = useState<string>(initial?.title ?? "");
  const [description, setDescription] = useState<string>(
    initial?.description ?? ""
  );
  const [status, setStatus] = useState<TaskStatus>(initial?.status ?? "todo");
  const [priority, setPriority] = useState<TaskPriority>(
    initial?.priority ?? "medium"
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, description, status, priority });
      }}
      className="flex flex-col gap-5"
    >
      {/* Title Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FileText className="w-4 h-4 text-blue-600" />
          Title
        </label>
        <input
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <AlignLeft className="w-4 h-4 text-blue-600" />
          Description
        </label>
        <textarea
          placeholder="Add task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400 min-h-25 resize-none"
          rows={4}
        />
      </div>

      {/* Status and Priority Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Status Select */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <ListTodo className="w-4 h-4 text-blue-600" />
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-gray-900 bg-white cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232563eb'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem",
              paddingRight: "2.5rem",
            }}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Priority Select */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Flag className="w-4 h-4 text-blue-600" />
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-gray-900 bg-white cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232563eb'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem",
              paddingRight: "2.5rem",
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-2 w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-98 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
        {loading ? "Saving..." : "Save Task"}
      </button>
    </form>
  );
}
