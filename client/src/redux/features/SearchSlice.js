import { createSlice } from "@reduxjs/toolkit"
export const searchSlice = createSlice({
    name: "search",
    initialState: {
        text: null
    },
    reducers: {
        setSearch: (state, action) => {
            state.text = action.payload;
        }
    }
});
export const  {setSearch}  = searchSlice.actions;
export default searchSlice.reducer;