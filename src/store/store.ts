import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
