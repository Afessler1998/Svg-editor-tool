import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import svgList from "./reducers/svgList";
import selectTool from './reducers/selectTool';
import eventListener from './reducers/eventListener';
import pathCreation from "./reducers/pathCreation";

export const store = configureStore({
  reducer: {
      svgList: svgList,
      selectTool: selectTool,
      eventListener: eventListener,
      pathCreation: pathCreation
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);