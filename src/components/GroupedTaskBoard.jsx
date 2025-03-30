import React, { useEffect, useMemo, useState } from 'react';
import {
  Box, Typography, Card, Chip, Avatar, IconButton,
  Tooltip, Button
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { reorderTasks } from '../features/tasks/taskSlice';
import { SwapVert } from '@mui/icons-material';
import FilterTaskDialog from './FilterTaskDialog';
import { filterTasksByOptions } from '../utils/taskFilters';

const statusColors = {
  'To Do': '#3b82f6',
  'In Progress': '#f59e0b',
  Completed: '#10b981'
};





const TaskCard = ({ task, index, onEdit, onDelete }) => (
  <Draggable draggableId={String(task.id)} index={index}>
    {(provided) => (
      <Card
        variant="outlined"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        sx={{ borderRadius: 2, p: 2, mb: 2, bgcolor: '#fff', boxShadow: 1 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip
            label={task.priority}
            size="small"
            sx={{
              bgcolor:
                task.priority === 'High' ? '#fee2e2' :
                  task.priority === 'Medium' ? '#fef3c7' :
                    '#d1fae5',
              color:
                task.priority === 'High' ? '#b91c1c' :
                  task.priority === 'Medium' ? '#92400e' :
                    '#047857'
            }}
          />
          <Box>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(task.id)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={() => onDelete(task.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="subtitle1" fontWeight={600}>{task.title}</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {task.description}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box display="flex">
            {(task.assignees || []).map((url, i) => (
              <Avatar
                key={i}
                src={url}
                sx={{ width: 24, height: 24, ml: i > 0 ? -1 : 0, border: '2px solid white' }}
              />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {task.dueDate}
          </Typography>
        </Box>
      </Card>
    )}
  </Draggable>
);


const TaskColumn = ({ status, tasks, color, onEdit, onDelete, }) => {

  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [dialogFilters, setDialogFilters] = useState({ priority: 'all', date: 'all', sortBy: 'order', sortOrder: 'asc' });
  const [activeFilters, setActiveFilters] = useState({ priority: 'all', date: 'all', sortBy: 'order', sortOrder: 'asc' });



  const handleFilterChange = (field, value) => {
    setDialogFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    setActiveFilters(dialogFilters);
    setOpenFilterDialog(false);
  };

  const handleResetFilters = () => {
    setDialogFilters({ priority: 'all', date: 'all' });
  };

  const filteredTasks = useMemo(() => {
    return filterTasksByOptions(tasks, activeFilters);
  }, [tasks, activeFilters]);

  console.log('Tasks:', tasks);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            backgroundColor: '#f9fafb',
            borderRadius: 2,
            padding: 2,
            minHeight: 300,
            border: `1px solid ${color}`,
            flex: 1,
            mx: 1,
            maxHeight: '100%',
          }}
        >
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2} display="flex" alignItems="center">
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, mr: 1 }} />
              {status}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <IconButton onClick={() => setOpenFilterDialog(true)} size="small">
                <SwapVert fontSize="small" color="action" />
              </IconButton>
              <FilterTaskDialog
                open={openFilterDialog}
                onClose={() => setOpenFilterDialog(false)}
                filters={dialogFilters}
                handleFilterChange={handleFilterChange}
                handleApplyFilters={handleApplyFilters}
                handleResetFilters={handleResetFilters}
              />
            </Box>
          </Box>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              color: '#9ca3af',
            }} >
              No tasks available
            </Box>
          )}

          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  )

}

const GroupedTaskBoard = ({ onEdit, onDelete, onAddClick, onStatusChange, tasks, }) => {

  const grouped = { 'To Do': [], 'In Progress': [], Completed: [] };
  tasks.forEach(task => {
    const status = task.status || 'To Do';
    grouped[status].push(task);
  });

  Object.keys(grouped).forEach(status => {
    grouped[status].sort((a, b) => a.order - b.order);
  });



  const dispatch = useDispatch();
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const taskId = Number(draggableId);
    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol !== destCol) {
      onStatusChange(taskId, destCol);
    } else {
      dispatch(reorderTasks({
        sourceIndex: source.index,
        destIndex: destination.index,
        status: sourceCol
      }));
    }
  };

  return (
    <Box mt={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>My Tasks</Typography>
        <Button
          variant="contained"
          onClick={onAddClick}
          sx={{ backgroundColor: '#000', color: '#fff', textTransform: 'none', fontWeight: 500 }}
        >
          + Add New Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {Object.entries(grouped).map(([status, list]) => (
            <Box key={status} flexBasis={{ xs: '100%', md: '32%' }} mb={3}>
              <TaskColumn
                status={status}
                tasks={list}
                color={statusColors[status]}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </Box>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default GroupedTaskBoard;
