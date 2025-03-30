import React, { useState } from 'react';
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
    FormGroup,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
    Divider,
    Typography,
    IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const FilterTaskDialog = ({ open, onClose, filters, handleFilterChange, handleApplyFilters, handleResetFilters }) => {

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Filter Tasks
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>

                {/* Filter by Priority */}
                <Typography variant="subtitle2" gutterBottom>
                    Filter By Priority
                </Typography>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={filters.priority}
                        onChange={(e) => handleFilterChange('priority', e.target.value)}
                        label="Priority"
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                </FormControl>

                <Divider sx={{ my: 2 }} />

                {/* Filter by Date */}
                <Typography variant="subtitle2" gutterBottom>
                    Filter By Date
                </Typography>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Date Range</InputLabel>
                    <Select
                        value={filters.date}
                        onChange={(e) => handleFilterChange('date', e.target.value)}
                        label="Date Range"
                    >
                        <MenuItem value="all">All Time</MenuItem>
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="week">This Week</MenuItem>
                        <MenuItem value="month">This Month</MenuItem>
                    </Select>
                </FormControl>

                <Divider sx={{ my: 2 }} />

                {/* Sort By */}
                <Typography variant="subtitle2" gutterBottom>
                    Sort By
                </Typography>
                <FormControl component="fieldset" fullWidth margin="dense">
                    <RadioGroup
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    >
                        <FormControlLabel value="date" control={<Radio />} label="Date" />
                        <FormControlLabel value="priority" control={<Radio />} label="Priority" />
                        <FormControlLabel value="title" control={<Radio />} label="Title" />
                    </RadioGroup>
                </FormControl>

                <Divider sx={{ my: 2 }} />

                {/* Sort Order */}
                <Typography variant="subtitle2" gutterBottom>
                    Sort Order
                </Typography>
                <FormControl component="fieldset" fullWidth margin="dense">
                    <RadioGroup
                        value={filters.sortOrder}
                        onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                    >
                        <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
                        <FormControlLabel value="desc" control={<Radio />} label="Descending" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleResetFilters} color="inherit">
                    Reset
                </Button>
                <Button onClick={handleApplyFilters} color="primary" variant="contained">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterTaskDialog;