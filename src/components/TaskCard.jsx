import React from 'react';
import {
  Box,
  Card,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Chip,
  useTheme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Draggable } from '@hello-pangea/dnd';

const TaskCard = ({ task, index, onEdit, onDelete, onToggleComplete }) => {
  const theme = useTheme();
  const isCompleted = task.status === 'Completed';
  const priority = task.priority || 'Medium';

  const priorityStyles = {
    High: {
      bg: theme.palette.error.light,
      border: theme.palette.error.main,
      text: theme.palette.error.contrastText,
    },
    Medium: {
      bg: theme.palette.warning.light,
      border: theme.palette.warning.main,
      text: theme.palette.warning.contrastText,
    },
    Low: {
      bg: theme.palette.success.light,
      border: theme.palette.success.main,
      text: theme.palette.success.contrastText,
    },
  };

  const { bg, border, text } = priorityStyles[priority];

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            boxShadow: snapshot.isDragging ? 4 : 1,
            backgroundColor: snapshot.isDragging
              ? theme.palette.action.hover
              : theme.palette.background.paper,
            borderLeft: `4px solid ${border}`,
            opacity: isCompleted ? 0.6 : 1,
            transition: 'all 0.25s ease-in-out',
            '&:hover': {
              boxShadow: 3,
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {/* Header Row */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Chip
              label={priority}
              size="small"
              sx={{
                bgcolor: bg,
                color: text,
                fontWeight: 500,
              }}
            />
            <Box>
              <Tooltip title="Edit Task">
                <IconButton size="small" onClick={() => onEdit(task.id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Task">
                <IconButton size="small" onClick={() => onDelete(task.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Title + Description */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted
                ? theme.palette.text.secondary
                : theme.palette.text.primary,
            }}
          >
            {task.title}
          </Typography>

          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                textDecoration: isCompleted ? 'line-through' : 'none',
              }}
            >
              {task.description}
            </Typography>
          )}

          {/* Footer */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            {/* Assignees */}
            <Box display="flex">
              {(task.assignees || []).map((url, i) => (
                <Avatar
                  key={i}
                  src={url}
                  alt={`Assignee ${i + 1}`}
                  sx={{
                    width: 24,
                    height: 24,
                    ml: i > 0 ? -1 : 0,
                    border: `2px solid ${theme.palette.background.paper}`,
                  }}
                />
              ))}
            </Box>

            {/* Due Date + Completion Toggle */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" color="text.secondary">
                {task.dueDate || 'No due date'}
              </Typography>
              <Tooltip title={isCompleted ? 'Completed' : 'Mark as Completed'}>
                <IconButton
                  onClick={() => onToggleComplete(task)}
                  size="small"
                  sx={{
                    color: isCompleted
                      ? theme.palette.success.main
                      : theme.palette.text.secondary,
                  }}
                >
                  {isCompleted ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
