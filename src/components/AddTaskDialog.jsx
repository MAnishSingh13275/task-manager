import React, { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Stack,
  IconButton,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const priorities = ['Low', 'Medium', 'High'];

const AddTaskDialog = ({ open, onClose, onSubmit, initialTask = null }) => {
  const isEdit = Boolean(initialTask);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  const titleRef = useRef(null);

  useEffect(() => {
    if (open) {
      titleRef.current?.focus();
      if (isEdit) {
        const { title, priority, dueDate, description } = initialTask;
        setTitle(title || '');
        setPriority(priority || 'Medium');
        setDueDate(dueDate || '');
        setDescription(description || '');
      } else {
        resetForm();
      }
    }
  }, [open, isEdit, initialTask]);

  const resetForm = () => {
    setTitle('');
    setPriority('Medium');
    setDueDate('');
    setDescription('');
  };

  const handleClose = () => {
    onClose();
    if (!isEdit) resetForm();
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const task = {
      ...(isEdit ? initialTask : {}),
      id: isEdit ? initialTask.id : Date.now(),
      title: title.trim(),
      priority,
      dueDate,
      description,
      status: isEdit ? initialTask.status : 'To Do',
      completed: isEdit ? initialTask.completed : false,
      assignees: initialTask?.assignees || []
    };

    onSubmit(task);
    handleClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && title.trim()) handleSubmit();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 0
        }}
      >
        {isEdit ? 'Edit Task' : 'Add New Task'}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            autoFocus
            label="Task Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />

          <TextField
            label="Priority"
            variant="outlined"
            select
            fullWidth
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {priorities.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <TextField
            label="Description"
            multiline
            minRows={3}
            variant="outlined"
            fullWidth
            placeholder="Add task details or instructions..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!title.trim()}
        >
          {isEdit ? 'Update Task' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
