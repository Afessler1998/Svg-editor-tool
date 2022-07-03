import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface eventListener {
  title: string
}

const initialState: eventListener = {
  title: "Untitled"
}

export const eventListenerSlice = createSlice({
  name: 'eventListener',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
        state.title = action.payload;
    },
  },
})

export const { setTitle } = eventListenerSlice.actions

export default eventListenerSlice.reducer