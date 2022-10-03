import { configureStore } from '@reduxjs/toolkit';
import boards from '../component/columns/columnsSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'canbanReact',
    storage,
    blacklist: ['newTask']
}

const persistedReducer = persistReducer(persistConfig,boards)

export const store = configureStore({
    reducer: {
        boards: persistedReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export let persistor = persistStore(store)






