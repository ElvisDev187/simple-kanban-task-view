import { useState } from "react";
import { useTaskStore } from "@/store/taskstore";
import Column from "./colum";
import ColumnTilte from "./column-title";
import TaskCard from "./task-card";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { Task } from "@/types";
function TaskList() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const tasks = useTaskStore((state) => state.tasks);
  const moveTask = useTaskStore((state) => state.moveTask);
  const todotasks = tasks.filter((task) => task.status === "todo");
  const doingtasks = tasks.filter((task) => task.status === "inProgress");
  const donetasks = tasks.filter((task) => task.status === "done");

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      moveTask(active.id as string, over?.id as Task["status"]);
    }
    setActiveId(null);
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid lg:grid-cols-3 grid-cols-[repeat(3,384px)] gap-x-8 overflow-auto">
        <Column id="todo">
          <ColumnTilte title="TO DO" />
          {todotasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Column>
        <Column id="inProgress">
          <ColumnTilte title="DOING" />
          {doingtasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Column>
        <Column id="done">
          <ColumnTilte title="DONE" />
          {donetasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Column>
      </div>
      <DragOverlay>
        {activeId ? (
          <TaskCard task={tasks.find((task) => task.id === activeId)!} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default TaskList;
