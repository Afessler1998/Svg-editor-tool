import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface eventListenerState {
  mouseIsDown: boolean,
}

const initialState: eventListenerState = {
  mouseIsDown: false
}

export const eventListenerStateSlice = createSlice({
  name: 'eventListenerState',
  initialState,
  reducers: {
    setMouseIsDown(state, action: PayloadAction<boolean>) {
        state.mouseIsDown = action.payload
    },
  },
})

export const { setMouseIsDown } = eventListenerStateSlice.actions

export default eventListenerStateSlice.reducer