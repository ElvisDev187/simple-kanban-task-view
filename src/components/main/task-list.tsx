import { useTasks } from "@/hooks/useTask";
import Column from "./colum";
import ColumnTilte from "./column-title";
import TaskCard from "./task-card";
import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function TaskList() {
  const {
    activeTask,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    todotasks,
    doingtasks,
    donetasks,
  } = useTasks();

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
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
