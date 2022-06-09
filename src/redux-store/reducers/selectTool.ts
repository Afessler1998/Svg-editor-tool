import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface selectTool {
  selectedTool: string
}

const initialState: selectTool = {
  selectedTool: "line"
}

export const selectToolSlice = createSlice({
  name: 'selectTool',
  initialState,
  reducers: {
    setSelectedTool(state, action: PayloadAction<string>) {
        state.selectedTool = action.payload
    },
  },
})

export const { setSelectedTool } = selectToolSlice.actions

export default selectToolSlice.reducer