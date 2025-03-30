import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import TaskCharts from '../components/TaskCharts';
import UpcomingTasks from '../components/UpcomingTasks';
import AddTaskDialog from '../components/AddTaskDialog';
import GroupedTaskBoard from '../components/GroupedTaskBoard';
import {
  addTask,
  deleteTask,
  editTask,
} from '../features/tasks/taskSlice';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  const isEmpty = tasks.length === 0;

  const statusColors = {
    'To Do': theme.palette.info.main,
    'In Progress': theme.palette.warning.main,
    Completed: theme.palette.success.main,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      {/* Welcome Banner */}
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: '#fff7ed',
          borderLeft: '6px solid #f97316',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <EmojiEmotionsIcon color="warning" fontSize="large" />
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Welcome back, John!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here’s what’s going on with your tasks today.
          </Typography>
        </Box>
      </Card>

      {/* Empty State */}
      {isEmpty ? (
        <Box
          textAlign="center"
          mt={10}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <img
            src="https://undraw.co/api/illustrations/1f414dcc-91b7-47e4-b063-e6f178d91c68"
            alt="No tasks"
            style={{ maxWidth: 320, marginBottom: 24 }}
          />
          <Typography variant="h5" fontWeight={600} gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Get started by adding your first task.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            size="large"
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            + Add New Task
          </Button>
        </Box>
      ) : (
        <>
          {/* Charts + Upcoming Tasks */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Box minWidth={isMobile ? '100%' : 'calc(75% - 16px)'}>
              <TaskCharts tasks={tasks} />
            </Box>
            <Box minWidth={isMobile ? '100%' : 'calc(25% - 16px)'}>
              <UpcomingTasks tasks={tasks} />
            </Box>
          </Box>

          {/* Summary Cards */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {['To Do', 'In Progress', 'Completed'].map((status) => (
              <Box sx={{
                flex: 1,
              }} key={status}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    borderTop: `5px solid ${statusColors[status]}`,
                    textAlign: 'center',
                    boxShadow: 2,
                    bgcolor: theme.palette.background.paper,
                    height: '100%',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    {status}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {tasks.filter((t) => t.status === status).length}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Task Board */}
          <GroupedTaskBoard
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onAddClick={() => setOpenDialog(true)}
            onStatusChange={handleStatusChange}
          />
        </>
      )}

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
