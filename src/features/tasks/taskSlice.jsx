// features/tasks/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage if available
const loadTasks = () => {
    try {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const initialState = {
    list: loadTasks(),
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { status } = action.payload;
            const sameStatusTasks = state.list.filter((t) => t.status === status);
            const newTask = {
                order: sameStatusTasks.length, // add at end
                ...action.payload,
            };
            state.list.push(newTask);
        },

        deleteTask: (state, action) => {
            state.list = state.list.filter((task) => task.id !== action.payload);
        },
        toggleTask: (state, action) => {
            const task = state.list.find((t) => t.id === action.payload);
            if (task) task.completed = !task.completed;
        },
        editTask: (state, action) => {
            const { id, updates } = action.payload;
            const index = state.list.findIndex((t) => t.id === id);
            if (index !== -1) {
                state.list[index] = { ...state.list[index], ...updates };
            }
        },
        updateTaskStatus: (state, action) => {
            const { id, status } = action.payload;
            const task = state.list.find((t) => t.id === id);
            if (task) task.status = status;
        },
        reorderTasks: (state, action) => {
            const { sourceIndex, destIndex, status } = action.payload;

            // Filter tasks of that column
            const tasksInStatus = state.list
                .filter((task) => task.status === status)
                .sort((a, b) => a.order - b.order);

            // Reorder in-memory
            const [movedTask] = tasksInStatus.splice(sourceIndex, 1);
            tasksInStatus.splice(destIndex, 0, movedTask);

            // Assign new order back
            tasksInStatus.forEach((task, index) => {
                const idx = state.list.findIndex((t) => t.id === task.id);
                state.list[idx].order = index;
            });
        }


    },
});

export const {
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    updateTaskStatus,
    reorderTasks
} = taskSlice.actions;

export default taskSlice.reducer;
