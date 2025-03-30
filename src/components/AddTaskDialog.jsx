import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Box
} from '@mui/material';

const AddTaskDialog = ({ open, onClose, onSubmit, initialTask = null }) => {
  const isEditMode = Boolean(initialTask);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isEditMode) {
      setTitle(initialTask.title || '');
      setPriority(initialTask.priority || 'Medium');
      setDueDate(initialTask.dueDate || '');
      setDescription(initialTask.description || '');
    } else {
      setTitle('');
      setPriority('Medium');
      setDueDate('');
      setDescription('');
    }
  }, [initialTask, isEditMode, open]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    const task = {
      ...(isEditMode ? initialTask : {}),
      id: isEditMode ? initialTask.id : Date.now(),
      title: title.trim(),
      priority,
      dueDate,
      description,
      status: isEditMode ? initialTask.status : 'To Do',
      completed: isEditMode ? initialTask.completed : false,
      assignees: [],
      
    };
    onSubmit(task);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? 'Edit Task' : 'Add New Task'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Task Title" fullWidth required value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="Priority" select fullWidth value={priority} onChange={(e) => setPriority(e.target.value)}>
            {['Low', 'Medium', 'High'].map((level) => (
              <MenuItem key={level} value={level}>{level}</MenuItem>
            ))}
          </TextField>
          <TextField label="Due Date" type="date" InputLabelProps={{ shrink: true }} fullWidth value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <TextField label="Description" multiline minRows={3} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{isEditMode ? 'Update Task' : 'Add Task'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
