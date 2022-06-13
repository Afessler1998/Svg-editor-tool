import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface eventListener {
  mouseIsDown: boolean,
}

const initialState: eventListener = {
  mouseIsDown: false
}

export const eventListenerSlice = createSlice({
  name: 'eventListener',
  initialState,
  reducers: {
    setMouseIsDown(state, action: PayloadAction<boolean>) {
        state.mouseIsDown = action.payload
    },
  },
})

export const { setMouseIsDown } = eventListenerSlice.actions

export default eventListenerSlice.reducer