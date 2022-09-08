import { configureStore } from '@reduxjs/toolkit';
import boards from '../component/columns/columnsSlice';

const store = configureStore({
    reducer: {boards},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;






