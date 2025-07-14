import { useState } from "react";
import { useTaskStore } from "@/store/taskstore";
import Column from "./colum";
import ColumnTilte from "./column-title";
import TaskCard from "./task-card";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import type { Task } from "@/types";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

function TaskList() {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const tasks = useTaskStore((state) => state.tasks);
  const moveTask = useTaskStore((state) => state.moveTask);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);
  const insertTaskAtPosition = useTaskStore(
    (state) => state.insertTaskAtPosition
  );

  const todotasks = tasks.filter((task) => task.status === "todo");
  const doingtasks = tasks.filter((task) => task.status === "inProgress");
  const donetasks = tasks.filter((task) => task.status === "done");

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    // Trouver la tâche active pour l'overlay
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { over } = event;
    setOverId((over?.id as string) || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      setOverId(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Trouver la tâche active
    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    // Déterminer si on drop sur une colonne ou sur une tâche
    const isDroppedOnColumn = ["todo", "inProgress", "done"].includes(overId);

    if (isDroppedOnColumn) {
      // Drop sur une colonne vide - ajouter à la fin
      const newStatus = overId as Task["status"];
      if (activeTask.status !== newStatus) {
        moveTask(activeId, newStatus);
      }
    } else {
      // Drop sur une tâche - déterminer la position précise
      const overTask = tasks.find((task) => task.id === overId);
      if (!overTask) return;

      if (activeTask.status === overTask.status) {
        // Même colonne - réorganiser avec position précise
        const columnTasks = tasks.filter(
          (task) => task.status === activeTask.status
        );
        const oldIndex = columnTasks.findIndex((task) => task.id === activeId);
        const newIndex = columnTasks.findIndex((task) => task.id === overId);

        if (oldIndex !== newIndex) {
          const reorderedTasks = arrayMove(columnTasks, oldIndex, newIndex);
          reorderTasks(activeTask.status, reorderedTasks);
        }
      } else {
        // Colonnes différentes - insérer à la position précise
        // Utiliser la position relative de la souris par rapport au centre de l'élément
        const overRect = over.rect;
        const overCenterY = overRect.top + overRect.height / 2;
        const mouseY = active.rect.current.translated?.top || 0;
        const insertAfter = mouseY > overCenterY;

        insertTaskAtPosition(activeId, overTask.status, overId, insertAfter);
      }
    }

    setActiveTask(null);
    setOverId(null);
  }

  function handleDragCancel() {
    setActiveTask(null);
    setOverId(null);
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid lg:grid-cols-3 grid-cols-[repeat(3,384px)] gap-x-8 overflow-auto">
        <SortableContext
          items={todotasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column id="todo">
            <ColumnTilte title="TO DO" />
            {todotasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Column>
        </SortableContext>

        <SortableContext
          items={doingtasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column id="inProgress">
            <ColumnTilte title="DOING" />
            {doingtasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Column>
        </SortableContext>

        <SortableContext
          items={donetasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column id="done">
            <ColumnTilte title="DONE" />
            {donetasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Column>
        </SortableContext>
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isOverlay={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default TaskList;
