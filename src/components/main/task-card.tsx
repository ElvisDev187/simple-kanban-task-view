import { type Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DropIndicator from "./drop-indicator";
import CustomCheckbox from "./custom-checkbox";

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
        <TaskBody task={task} />
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
        <TaskBody task={task} />
      </div>
    </>
  );
}

export default TaskCard;

const TaskBody = ({ task }: { task: Task }) => {
  const tagClass = (tag: string) => {
    switch (tag) {
      case "Design":
        return "bg-[#F2F4F7] text-[#475467]";
      case "Backend":
        return "bg-[#D1FADF] text-[#12B066]";
      case "Frontend":
        return "bg-[#7B61FF]/20 text-[#9747FF]";
      default:
        break;
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-1 flex-col">
        <h3 className="font-inter font-bold text-[#1D2939] text-lg">
          {task.title}
        </h3>
        <p className="font-inter font-medium text-sm text-[#1D2939]/60 p-0  line-clamp-3">
          {task.description}
        </p>
      </div>
      {task.subtasks && task.subtasks.length > 0 ? (
        <div className="">
          <h3 className="font-inter font-medium text-[13px] text-[#222222]/50 mb-3">
            Sub Tasks
          </h3>
          <div className="flex flex-col gap-3">
            {task.subtasks.slice(0, 2).map((subtask) => (
              <CustomCheckbox
                key={subtask.id}
                label={subtask.title}
                initialChecked={subtask.isCompleted}
              />
            ))}
          </div>
        </div>
      ) : null}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className={` font-inter font-semibold text-xs px-2 py-1.5 rounded-md ${tagClass(
                tag
              )}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
