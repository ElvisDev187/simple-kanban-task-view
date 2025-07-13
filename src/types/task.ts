export type Task = {
  id: string;
  title: string;
  description: string | undefined;
  tags: string[] | undefined;
  subtasks: Subtask[] | undefined;
  links: string[] | undefined;
  images: string[] | undefined;
  status: "todo" | "inProgress" | "done";
};

export type Subtask = {
  id: string;
  title: string;
  isCompleted: boolean;
};
