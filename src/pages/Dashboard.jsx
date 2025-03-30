import React, { useState } from 'react';
import { Grid, Container, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import TaskCharts from '../components/TaskCharts';
import UpcomingTasks from '../components/UpcomingTasks';
import AddTaskDialog from '../components/AddTaskDialog';
import GroupedTaskBoard from '../components/GroupedTaskBoard';
import { addTask, deleteTask, editTask } from '../features/tasks/taskSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);

  const [openDialog, setOpenDialog] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setTaskToEdit(null);
  };

  const handleSubmitTask = (task) => {
    taskToEdit
      ? dispatch(editTask({ id: task.id, updates: task }))
      : dispatch(addTask(task));
    handleDialogClose();
  };

  const handleEditTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTaskToEdit(task);
      setOpenDialog(true);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(editTask({ id, updates: { status: newStatus } }));
  };

  const handleDeleteTask = (id) => dispatch(deleteTask(id));



  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid>
          <TaskCharts tasks={tasks} />
        </Grid>
        <Grid>
        <UpcomingTasks tasks={tasks} />

        </Grid>
      </Grid>

      <GroupedTaskBoard
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onAddClick={() => setOpenDialog(true)}
        onStatusChange={handleStatusChange}
      />

      <AddTaskDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSubmit={handleSubmitTask}
        initialTask={taskToEdit}
      />
    </Container>
  );
};

export default Dashboard;
