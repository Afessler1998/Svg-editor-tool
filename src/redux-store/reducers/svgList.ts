import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import svgList from "../../types/svgList";

const initialState: svgList = {
  firstPointCoordinates: {x0: 0, y0: 0},
  list: [],
  selectedElement: null,
  selectedOutline: null,
  selectedNode: null,
}

export const svgListSlice = createSlice({
  name: 'svgList',
  initialState,
  reducers: {
    setFirstPointCoordinates(state, action: PayloadAction<{x0: number, y0: number}>) {
      state.firstPointCoordinates = action.payload;
    },
    addElement(state, action: PayloadAction<any>) {
        state.list = [...state.list, action.payload];
        state.list.sort((a, b) => a.id - b.id);
    },
    removeElement(state, action: PayloadAction<string>) {
        state.list = state.list.filter((element) => element.id !== action.payload);
    },
    setSelectedElement(state, action: PayloadAction<any>) {
        state.selectedElement = action.payload;
    },
    setSelectedOutline(state, action: PayloadAction<any>) {
        state.selectedOutline = action.payload;
    },
    setSelectedNode(state, action: PayloadAction<any>) {
        state.selectedNode = action.payload;
    },
  },
})

export const { setFirstPointCoordinates, addElement, removeElement, setSelectedElement, setSelectedOutline, setSelectedNode } = svgListSlice.actions

export default svgListSlice.reducer