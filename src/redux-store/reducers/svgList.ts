import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface svgList {
  firstPointCoordinates: {x: number, y: number},
  selectedSvgElement: string,
  list: Array<any>
}

const initialState: svgList = {
  firstPointCoordinates: {x: -1, y: -1},
  selectedSvgElement: '',
  list: []
}

export const svgListSlice = createSlice({
  name: 'svgList',
  initialState,
  reducers: {
    setFirstPointCoordinates(state, action: PayloadAction<{x: number, y: number}>) {
      state.firstPointCoordinates = action.payload;
    },
    setSelectedSvgElement(state, action: PayloadAction<string>) {
      state.selectedSvgElement = action.payload;
    },
    addElement(state, action: PayloadAction<any>) {
        state.list = [...state.list, action.payload];
    },
    removeElement(state, action: PayloadAction<string>) {
        state.list = state.list.filter((element) => element.id !== action.payload);
    },
  },
})

export const { setFirstPointCoordinates, addElement, removeElement } = svgListSlice.actions

export default svgListSlice.reducer