import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchTasks } from '../store/taskSlice';
import TaskBoard from '../components/TaskBoard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.token) {
      dispatch(fetchTasks(user.token));
    }
  }, [user.token, dispatch]);

  return <TaskBoard />;
};

export default Dashboard;
