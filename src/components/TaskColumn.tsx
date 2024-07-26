import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ column, tasks, innerRef, ...props }: any) => (
  <div className="task-column" ref={innerRef} {...props}>
    <h3>{column}</h3>
    {tasks.map((task: any, index: number) => (
      <Draggable key={task._id} draggableId={task._id} index={index}>
        {(provided) => (
          <TaskCard
            key={task._id}
            task={task}
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          />
        )}
      </Draggable>
    ))}
  </div>
);

export default TaskColumn;
