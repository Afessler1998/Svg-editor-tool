import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface svgList {
  firstPointCoordinates: {x: number, y: number},
  list: Array<any>,
  selectedElement: any,
}

const initialState: svgList = {
  firstPointCoordinates: {x: -1, y: -1},
  list: [],
  selectedElement: null,
}

export const svgListSlice = createSlice({
  name: 'svgList',
  initialState,
  reducers: {
    setFirstPointCoordinates(state, action: PayloadAction<{x: number, y: number}>) {
      state.firstPointCoordinates = action.payload;
    },
    addElement(state, action: PayloadAction<any>) {
        state.list = [...state.list, action.payload];
    },
    removeElement(state, action: PayloadAction<string>) {
        state.list = state.list.filter((element) => element.id !== action.payload);
    },
    setSelectedElement(state, action: PayloadAction<any>) {
        state.selectedElement = action.payload;
    },
  },
})

export const { setFirstPointCoordinates, addElement, removeElement, setSelectedElement } = svgListSlice.actions

export default svgListSlice.reducer