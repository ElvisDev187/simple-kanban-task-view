import { useDraggable } from "@dnd-kit/core";
import { type Task } from "../../types";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white p-5 flex flex-col gap-5 rounded-lg card"
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="font-inter font-bold text-[#1D2939] text-lg">
          {task.title}
        </h3>
        <p className="font-inter font-medium text-sm text-[#1D2939]/60 p-0">
          {task.description}
        </p>
      </div>
    </div>
  );
}

export default TaskCard;
