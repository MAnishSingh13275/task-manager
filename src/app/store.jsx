// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';

const store = configureStore({
    reducer: {
        tasks: taskReducer
    }

});


store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasks.list));
});

export default store;