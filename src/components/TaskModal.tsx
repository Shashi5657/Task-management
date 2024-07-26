import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../store/taskSlice';

const TaskModal = ({ task, onClose }: any) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : 'To-Do');
  const [priority, setPriority] = useState(task ? task.priority : 'Low');
  const [deadline, setDeadline] = useState(task ? task.deadline : '');

  const handleSubmit = () => {
    if (task) {
      dispatch(editTask({ ...task, title, description, status, priority, deadline }));
    } else {
      dispatch(addTask({ title, description, status, priority, deadline }));
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={handleSubmit}>{task ? 'Update' : 'Add'} Task</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
