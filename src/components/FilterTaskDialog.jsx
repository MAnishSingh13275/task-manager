// src/components/FilterTaskDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  IconButton,
  Divider,
  Stack,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FilterTaskDialog = ({
  open,
  onClose,
  filters,
  handleFilterChange,
  handleApplyFilters,
  handleResetFilters
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 5
        }}
      >
        Filter Tasks
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Priority Filter */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Filter by Priority
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                value={filters.priority}
                onChange={(e) =>
                  handleFilterChange('priority', e.target.value)
                }
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider />

          {/* Date Filter */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Filter by Due Date
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                label="Date Range"
                value={filters.date}
                onChange={(e) =>
                  handleFilterChange('date', e.target.value)
                }
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider />

          {/* Sort By */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Sort By
            </Typography>
            <RadioGroup
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <FormControlLabel value="date" control={<Radio />} label="Date" />
              <FormControlLabel value="priority" control={<Radio />} label="Priority" />
              <FormControlLabel value="title" control={<Radio />} label="Title" />
            </RadioGroup>
          </Box>

          <Divider />

          {/* Sort Order */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Sort Order
            </Typography>
            <RadioGroup
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            >
              <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
              <FormControlLabel value="desc" control={<Radio />} label="Descending" />
            </RadioGroup>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleResetFilters} color="inherit">
          Reset
        </Button>
        <Button onClick={handleApplyFilters} variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterTaskDialog;
