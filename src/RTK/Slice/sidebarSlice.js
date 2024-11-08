import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // sidebarShow: true,
  active: true,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, { payload }) => {
      return { ...state, ...payload }
    },
    hideShowSidebar: (state) => {
      state.active = !state.active
    },
  },
})

export const { toggleSidebar, hideShowSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
