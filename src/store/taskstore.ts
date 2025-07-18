import { createContext, useContext } from "react";
import { useStore, type StoreApi } from "zustand";
import type { Task } from "@/types";
export interface TaskState {
    tasks: Task[];  
}

export interface TaskAction {
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    setTasks: (tasks: Task[]) => void;
    deleteTask: (taskId: string) => void;
    moveTask: (taskId: string, newStatus: Task["status"]) => void;
    reorderTasks: (status: Task["status"], reorderedTasks: Task[]) => void;
    insertTaskAtPosition: (taskId: string, newStatus: Task["status"], targetTaskId: string, insertAfter: boolean) => void;
}

export const TaskContext = createContext<StoreApi<TaskState & TaskAction> | undefined>(
  undefined,
);

export function  useTaskStore<T>(selector: (state: TaskState & TaskAction) => T) {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('TaskContext.Provider is missing');
  }

  return useStore(context, selector);
  }