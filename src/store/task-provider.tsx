import { createStore } from "zustand";
import { useState, type PropsWithChildren } from "react";
import type { Task } from "../types";
import { TaskContext, type TaskAction, type TaskState } from "./taskstore";

type TaskContextProviderProps = PropsWithChildren & {
  initialTasks: Task[];
};

export default function TaskContextProvider({
  children,
  initialTasks,
}: TaskContextProviderProps) {
  const [store] = useState(
    createStore<TaskState & TaskAction>((set) => ({
      tasks: initialTasks,
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        })),
    }))
  );

  return <TaskContext.Provider value={store}>{children}</TaskContext.Provider>;
}
