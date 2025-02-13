
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { loggerMiddleware, performanceMiddleware } from './middleware';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,

      //for rtk query
      //   [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        loggerMiddleware,
        performanceMiddleware
        // .concat(authApi.middleware),
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];