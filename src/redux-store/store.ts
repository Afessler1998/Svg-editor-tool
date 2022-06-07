import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import svgList from "./reducers/svgList"
import selectTool from './reducers/selectTool'

export const store = configureStore({
  reducer: {
      svgList: svgList,
      selectTool: selectTool
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);