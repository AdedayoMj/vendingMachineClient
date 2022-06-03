import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { productApi } from './api/productApi';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import thunk from 'redux-thunk';
import type { ThunkAction } from 'redux-thunk';
import type { Action } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist';
import * as rp from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    productApi.reducerPath
  ],
  stateReconciles: hardSet as (inboundState: CombinedState) => CombinedState,
  version: 1,
}

type CombinedState = typeof rootReducer extends Reducer<infer U, any> ? U : never

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,

  userState: userReducer,
  productState: productReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER],
      },

    }).concat([thunk, logger, authApi.middleware, userApi.middleware, productApi.middleware]),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;