import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import TaskContextProvider from "@/store/task-provider.tsx";
import type { Task } from "@/types/task.ts";

const initialTasks = [
  {
    id: "1",
    title: "Task 1",
    description:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt provident voluptas quos ut! Ratione cumque dicta aperiam eos voluptatem nostrum, ducimus quod fugit nisi quisquam, officiis animi voluptate deserunt doloribus!",
    tags: ["Design", "Backend"],
    subtasks: [
      { id: "1", title: "Subtask 1", isCompleted: false },
      { id: "2", title: "Subtask 2", isCompleted: false },
    ],
    links: ["link1", "link2"],
    images: ["image1", "image2"],
    status: "todo",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    tags: ["tag3", "tag4"],
    subtasks: [
      { id: "3", title: "Subtask 3", isCompleted: false },
      { id: "4", title: "Subtask 4", isCompleted: false },
    ],
    links: ["link3", "link4"],
    images: ["image3", "image4"],
    status: "inProgress",
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    tags: ["tag5", "tag6"],
    subtasks: [
      { id: "5", title: "Subtask 5", isCompleted: false },
      { id: "6", title: "Subtask 6", isCompleted: false },
    ],
    links: ["link5", "link6"],
    images: ["image5", "image6"],
    status: "done",
  },
] as Task[];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskContextProvider initialTasks={initialTasks}>
      <App />
    </TaskContextProvider>
  </StrictMode>
);
