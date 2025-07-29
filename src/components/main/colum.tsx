import { useDroppable } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";

function Column(props: PropsWithChildren<{ id: string }>) {
  const { setNodeRef, isOver } = useDroppable({ id: props.id });

  return (
    <div
      className={`space-y-4  w-full p-2 rounded-lg transition-colors   max-w-xs ${
        isOver
          ? "bg-blue-50 border-2 border-blue-200 border-dashed"
          : "bg-transparent"
      }`}
      ref={setNodeRef}
    >
      {props.children}
    </div>
  );
}

export default Column;
