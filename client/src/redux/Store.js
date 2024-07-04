import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/AuthSlice'
import menuSlice from './features/MenuSlice';
import noteSlice from './features/NoteSlice';
import  searchSlice  from './features/SearchSlice';

const store = configureStore({
  reducer: {
    user: authSlice,
    menubar: menuSlice,
    note: noteSlice,
    search:searchSlice
  }
})

export default store;

