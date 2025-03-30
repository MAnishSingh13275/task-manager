import { createSlice } from '@reduxjs/toolkit';

const loadTasks = () => {
  try {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks:', err);
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
      const sameStatusTasks = state.list.filter((task) => task.status === status);
      const newTask = {
        ...action.payload,
        order: sameStatusTasks.length, // place at the end
      };
      state.list.push(newTask);
      saveTasks(state.list);
    },

    editTask: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.list.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updates };
        saveTasks(state.list);
      }
    },

    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      saveTasks(state.list);
    },

    toggleTask: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasks(state.list);
      }
    },

    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.list.find((task) => task.id === id);
      if (task) {
        task.status = status;
        saveTasks(state.list);
      }
    },

    reorderTasks: (state, action) => {
      const { sourceIndex, destIndex, status } = action.payload;

      // Filter & sort tasks within the same column
      const sortedColumnTasks = state.list
        .filter((task) => task.status === status)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      // If indices are invalid or no change needed
      if (
        sourceIndex < 0 ||
        destIndex < 0 ||
        sourceIndex >= sortedColumnTasks.length ||
        destIndex >= sortedColumnTasks.length ||
        sourceIndex === destIndex
      ) return;

      const movedTask = sortedColumnTasks[sourceIndex];
      sortedColumnTasks.splice(sourceIndex, 1);
      sortedColumnTasks.splice(destIndex, 0, movedTask);

      // Reassign order and update in state
      sortedColumnTasks.forEach((task, i) => {
        const idx = state.list.findIndex((t) => t.id === task.id);
        if (idx !== -1) {
          state.list[idx].order = i;
        }
      });

      saveTasks(state.list);
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  updateTaskStatus,
  reorderTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
