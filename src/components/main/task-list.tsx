import { useTasks } from "@/hooks/useTask";
import Column from "./colum";
import ColumnTilte from "./column-title";
import TaskCard from "./task-card";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}
    >
      <div className="grid lg:grid-cols-3 grid-cols-[repeat(3,384px)] gap-x-4 overflow-auto">
        <SortableContext
          items={todotasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column id="todo">
            <ColumnTilte title="TO DO" />
            <div className="column overflow-y-auto max-h-[calc(100vh_-_126px)]">
              {todotasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </Column>
        </SortableContext>

        <SortableContext
          items={doingtasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column id="inProgress">
            <ColumnTilte title="DOING" />
            <div className="column overflow-y-auto max-h-[calc(100vh_-_126px)]">
              {doingtasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </Column>
        </SortableContext>

        <SortableContext
          items={donetasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column id="done">
            <ColumnTilte title="DONE" />
            <div className="column overflow-y-auto max-h-[calc(100vh_-_126px)] ">
              {donetasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
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
