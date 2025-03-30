import React, { useMemo, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { editTask, reorderTasks } from '../features/tasks/taskSlice';
import TaskColumn from './TaskColumn';

const GroupedTaskBoard = ({ tasks, onEdit, onDelete, onAddClick, onStatusChange }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const statusList = ['To Do', 'In Progress', 'Completed'];

  const defaultFilters = useMemo(() => ({
    priority: 'all',
    date: 'all',
    sortBy: 'order',
    sortOrder: 'asc'
  }), []);

  const [columnFilters, setColumnFilters] = useState(() => {
    return statusList.reduce((acc, status) => {
      acc[status] = defaultFilters;
      return acc;
    }, {});
  });

  const [pendingFilters, setPendingFilters] = useState(() => {
    return statusList.reduce((acc, status) => {
      acc[status] = defaultFilters;
      return acc;
    }, {});
  });

  const groupedTasks = useMemo(() => {
    const grouped = { 'To Do': [], 'In Progress': [], Completed: [] };
    tasks.forEach(task => {
      const status = task.status || 'To Do';
      grouped[status].push(task);
    });
    Object.keys(grouped).forEach(status =>
      grouped[status].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    );
    return grouped;
  }, [tasks]);

  const handleFilterChange = useCallback((column, field, value) => {
    setPendingFilters(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        [field]: value
      }
    }));
  }, []);

  const handleApplyFilters = useCallback((column) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: pendingFilters[column]
    }));
  }, [pendingFilters]);

  const handleResetFilters = useCallback((column) => {
    setPendingFilters(prev => ({
      ...prev,
      [column]: defaultFilters
    }));
    setColumnFilters(prev => ({
      ...prev,
      [column]: defaultFilters
    }));
  }, [defaultFilters]);

  const resetColumnFilter = useCallback((column) => {
    setPendingFilters(prev => ({ ...prev, [column]: defaultFilters }));
    setColumnFilters(prev => ({ ...prev, [column]: defaultFilters }));
  }, [defaultFilters]);

  const handleDragEnd = useCallback(({ source, destination, draggableId }) => {
    if (!destination) return;

    const taskId = Number(draggableId);
    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol !== destCol) {
      resetColumnFilter(destCol);
      onStatusChange(taskId, destCol);

      const destTasks = tasks
        .filter((t) => t.status === destCol)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const updatedTaskList = [...destTasks];
      updatedTaskList.splice(destination.index, 0, { id: taskId });

      dispatch(editTask({
        id: taskId,
        updates: {
          status: destCol,
          order: destination.index,
        },
      }));

      updatedTaskList.forEach((task, idx) => {
        if (task.id === taskId) return;
        dispatch(editTask({ id: task.id, updates: { order: idx >= destination.index ? idx + 1 : idx } }));
      });
    } else {
      dispatch(reorderTasks({
        sourceIndex: source.index,
        destIndex: destination.index,
        status: sourceCol
      }));
    }
  }, [dispatch, tasks, onStatusChange, resetColumnFilter]);

  const handleToggleComplete = useCallback((task) => {
    if (task.status !== 'Completed') {
      onStatusChange(task.id, 'Completed');
    }
  }, [onStatusChange]);

  const statusColors = useMemo(() => ({
    'To Do': theme.palette.info.main,
    'In Progress': theme.palette.warning.main,
    Completed: theme.palette.success.main
  }), [theme]);

  return (
    <Box mt={theme.spacing(4)}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>My Tasks</Typography>
        <Button
          variant="contained"
          onClick={onAddClick}
          sx={{ textTransform: 'none', fontWeight: 500, boxShadow: 'none' }}
        >
          + Add New Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between">
          {statusList.map((status) => (
            <Box key={status} flex={1} minWidth="300px" maxWidth={{ xs: '100%', md: '32%' }}>
              <TaskColumn
                status={status}
                tasks={groupedTasks[status]}
                color={statusColors[status]}
                filters={columnFilters[status]}
                dialogFilters={pendingFilters[status]}
                onFilterChange={(field, value) => handleFilterChange(status, field, value)}
                onApplyFilters={() => handleApplyFilters(status)}
                onResetFilters={() => handleResetFilters(status)}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={handleToggleComplete}
              />
            </Box>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default GroupedTaskBoard;
