import React from 'react';

const TaskCard = ({ task, innerRef, ...props }: any) => (
  <div className="task-card" ref={innerRef} {...props}>
    <h4>{task.title}</h4>
    <p>{task.description}</p>
  </div>
);

export default TaskCard;
