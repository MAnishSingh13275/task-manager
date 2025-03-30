import React, { useMemo, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Fade,
  Tooltip,
  useTheme,
  Collapse
} from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { SwapVert, ExpandMore, ExpandLess } from '@mui/icons-material';
import FilterTaskDialog from './FilterTaskDialog';
import TaskCard from './TaskCard';
import { filterTasksByOptions } from '../utils/taskFilters';

const TaskColumn = ({
  status,
  tasks = [],
  color,
  filters = {},
  dialogFilters = {},
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  onEdit,
  onDelete,
  onToggleComplete
}) => {
  const theme = useTheme();
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const filteredTasks = useMemo(() => {
    return filterTasksByOptions(tasks, filters);
  }, [tasks, filters]);

  const handleOpenDialog = useCallback(() => setOpenFilterDialog(true), []);
  const handleCloseDialog = useCallback(() => setOpenFilterDialog(false), []);
  const handleApply = useCallback(() => {
    onApplyFilters();
    handleCloseDialog();
  }, [onApplyFilters, handleCloseDialog]);
  const handleReset = useCallback(() => {
    onResetFilters();
    handleCloseDialog();
  }, [onResetFilters, handleCloseDialog]);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            p: 2,
            minHeight: collapsed ? 0 : 300,
            border: `1px solid ${color}`,
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Column Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Box display="flex" alignItems="center">
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: color,
                  display: 'inline-block',
                  mr: 1
                }}
              />
              <Typography variant="subtitle1" fontWeight={600}>
                {status}
              </Typography>
            </Box>

            <Box>
              <Tooltip title="Filter Tasks">
                <IconButton onClick={handleOpenDialog} size="small">
                  <SwapVert fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={collapsed ? 'Expand' : 'Collapse'}>
                <IconButton onClick={toggleCollapse} size="small">
                  {collapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>

            <FilterTaskDialog
              open={openFilterDialog}
              onClose={handleCloseDialog}
              filters={dialogFilters}
              handleFilterChange={onFilterChange}
              handleApplyFilters={handleApply}
              handleResetFilters={handleReset}
            />
          </Box>

          {/* Task List */}
          <Collapse in={!collapsed} unmountOnExit>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                />
              ))
            ) : (
              <Fade in>
                <Typography variant="body2" color="text.secondary" align="center">
                  No tasks found
                </Typography>
              </Fade>
            )}
            {provided.placeholder}
          </Collapse>
        </Box>
      )}
    </Droppable>
  );
};

export default TaskColumn;
