import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTaskStatus } from '../store/taskSlice';
import TaskColumn from './TaskColumn';

const columns = ['To-Do', 'In Progress', 'Under Review', 'Completed'];

const TaskBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      dispatch(updateTaskStatus({
        taskId: result.draggableId,
        status: destination.droppableId,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {columns.map((column) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <TaskColumn
                key={column}
                column={column}
                tasks={tasks.filter((task) => task.status === column)}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {provided.placeholder}
              </TaskColumn>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
