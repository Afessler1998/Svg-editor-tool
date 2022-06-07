import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import counterReducer from './reducers/counter'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);