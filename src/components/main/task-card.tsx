import { type Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DropIndicator from "./drop-indicator";

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

function TaskCard({ task, isOverlay = false }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isOverlay) {
    return (
      <div className="bg-white p-5 flex flex-col gap-5 rounded-lg card opacity-90 rotate-3 shadow-lg">
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

  return (
    <>
      <DropIndicator beforeId={task.id} column={task.status} />
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className={`bg-white p-5 flex flex-col gap-5 rounded-lg card transition-opacity ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
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
    </>
  );
}

export default TaskCard;
