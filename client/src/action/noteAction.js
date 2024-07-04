import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteTour = createAsyncThunk(
    "tour/deleteTour",
    async ({ id, toast }, { rejectWithValue }) => {
        try {
            const res = await fetch(`/delete/${id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);