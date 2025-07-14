import { createStore } from "zustand";
import { useState, type PropsWithChildren } from "react";
import type { Task } from "@/types";
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
      reorderTasks: (status, reorderedTasks) =>
        set((state) => ({
          tasks: [
            ...state.tasks.filter((task) => task.status !== status),
            ...reorderedTasks,
          ],
        })),
      insertTaskAtPosition: (taskId, newStatus, targetTaskId, insertAfter) =>
        set((state) => {
          const taskToMove = state.tasks.find((task) => task.id === taskId);
          if (!taskToMove) return state;

          // Supprimer la tâche de sa position actuelle
          const tasksWithoutMoved = state.tasks.filter(
            (task) => task.id !== taskId
          );

          // Obtenir les tâches de la colonne cible
          const targetColumnTasks = tasksWithoutMoved.filter(
            (task) => task.status === newStatus
          );
          const otherTasks = tasksWithoutMoved.filter(
            (task) => task.status !== newStatus
          );

          // Trouver l'index de la tâche cible
          const targetIndex = targetColumnTasks.findIndex(
            (task) => task.id === targetTaskId
          );

          // Insérer la tâche à la bonne position
          const insertIndex = insertAfter ? targetIndex + 1 : targetIndex;
          const updatedTask = { ...taskToMove, status: newStatus };

          targetColumnTasks.splice(insertIndex, 0, updatedTask);

          return {
            tasks: [...otherTasks, ...targetColumnTasks],
          };
        }),
      setTasks: (tasks) => set(() => ({ tasks })),
    }))
  );

  return <TaskContext.Provider value={store}>{children}</TaskContext.Provider>;
}
