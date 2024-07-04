import { createSlice } from "@reduxjs/toolkit"
export const menuSlice = createSlice({
    name: "menu",
    initialState: {
        open: true,
    },
    reducers: {
        menuOpen: (state) => {
            state.open = true;
        },
        menuClose: (state) => {
            state.open = false;
        },
    }
});
export const {menuOpen,menuClose} = menuSlice.actions;
export default menuSlice.reducer;
