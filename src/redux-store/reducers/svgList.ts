import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface svgList {
  list: Array<any>
}

const initialState: svgList = {
  list: []
}

export const svgListSlice = createSlice({
  name: 'svgList',
  initialState,
  reducers: {
    addElement(state, action: PayloadAction<any>) {
        state.list = [...state.list, action.payload];
    },
  },
})

export const { addElement } = svgListSlice.actions

export default svgListSlice.reducer