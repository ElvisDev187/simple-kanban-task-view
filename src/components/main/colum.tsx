import { useDroppable } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";

function Column(props: PropsWithChildren<{ id: string }>) {
  const { setNodeRef } = useDroppable({ id: props.id });
  return (
    <div className="space-y-4" ref={setNodeRef}>
      {props.children}
    </div>
  );
}

export default Column;
