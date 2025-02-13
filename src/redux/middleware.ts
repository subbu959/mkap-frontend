import { Middleware } from '@reduxjs/toolkit';

/** Logger Middleware - Logs all actions */
export const loggerMiddleware: Middleware =
  (storeAPI) => (next) => (action: any) => {
    console.log('Dispatching:', action);
    const result = next(action);
    console.log('New State:', storeAPI.getState());
    return result;
  };

/** Performance Monitoring Middleware */
export const performanceMiddleware: Middleware =
  (storeAPI) => (next) => (action: any) => {
    const start = performance.now();
    const result = next(action);
    const end = performance.now();
    console.log(`Action [${action.type}] took ${end - start}ms`);
    return result;
  };
