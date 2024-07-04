import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";


export const deleteNote = createAsyncThunk(
    "note/deleteNote",
    async (data, { rejectWithValue }) => {
        const { id, toast } = data;
        try {
            const res = await fetch(`/trash/${id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            toast.success("successfully Done")
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateImage = createAsyncThunk(
    "note/updateImage",
    async (data, { rejectWithValue }) => {
        const { id, image } = data;
        try {
            const formData = new FormData();
            formData.append("image", image);
            axios.put(`/update/${id}`, formData);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const archiveNote = createAsyncThunk(
    "note/archiveNote",
    async (data, { rejectWithValue }) => {
        const { id, toast } = data;
        try {
            const res = await fetch(`/archived/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            toast.success("Note archived");
            const data = await res.json();
            const note = data?.note;
            return note;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const pinNote = createAsyncThunk(
    "note/pinNote",
    async (data, { rejectWithValue }) => {
        const { id } = data;
        console.log("id is", id);
        try {
            const res = await fetch(`/pin/${id}`, {
                method: "GET",
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
export const colorNote = createAsyncThunk(
    "note/ColorNote",
    async (data, { rejectWithValue }) => {
        const { id, color } = data;
        console.log("id is", id, color);
        try {
            const res = await fetch(`/color/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ color })
            });
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const backgroundNote = createAsyncThunk(
    "note/backgroundNote",
    async (data, { rejectWithValue }) => {
        const { id, background } = data;
        try {
            const res = await fetch(`/background/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ background })
            });
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const updateText = createAsyncThunk(
    "note/updateText",
    async (data, { rejectWithValue }) => {
        const { id, text } = data;
        try {
            const res = await fetch(`/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text })
            });
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const updateTitle = createAsyncThunk(
    "note/updateTitle",
    async (data, { rejectWithValue }) => {
        const { id, title } = data;
        console.log(data);
        try {
            const res = await fetch(`/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title })
            });
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const updateTodo = createAsyncThunk(
    "note/updateTodo",
    async (data, { rejectWithValue }) => {
        const { id, todo } = data;
        try {
            const res = await fetch(`/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ todo })
            });
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const deleteNoteForever = createAsyncThunk(
    "note/deleteNoteForever",
    async (data, { rejectWithValue }) => {
        const { id, toast } = data;
        try {
            const res = await fetch(`/delete/${id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            toast.success("Note Deleted Successfully");
            const data = await res.json();
            const note = data?.note;
            return note;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const noteUpdate = createAsyncThunk(
    "note/noteUpdate",
    async (data, { rejectWithValue }) => {
        const { title, text, color, background, pin, id } = data;
        console.log("This is ", title, text, color, background, pin, id);
        try {
            const res = await fetch(`/update/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, text, color, background, pin, id })
            });
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// export const filteredNote = createAsyncThunk(
//     "note/noteUpdate",
//     async (data, { rejectWithValue }) => {
//         const { text } = data;
//         try {
//             const res = await fetch(`/update/${text}`, {
//                 method: "get",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });
//             return res;
//         } catch (err) {
//             return rejectWithValue(err.response.data);
//         }
//     }
// );

const initialState = {
    isListView: Cookies.get("view") ? JSON.parse(Cookies.get("view")) : false,
    notes: Cookies.get("notes") ? JSON.parse(Cookies.get("notes")) : [],
    archiveNotes: [],
    trashNote: [],
    loading: false,
    error: "",
    searchNotes: [],
}

const noteSlice = createSlice({
    name: 'note',
    initialState: initialState,
    reducers: {
        changeView: (state, action) => {
            state.isListView = !state.isListView
        },
        createNote: (state, action) => {
            state.notes = action.payload;
        },
        addNote: (state, action) => {
            state.notes = [...state.notes, action.payload];
        },
        getArchiveNotes: (state, action) => {
            state.archiveNotes = action.payload;
        },
        searchNotes: (state, action) => {
            state.searchNotes = action.payload;
        },
        upgradeNote: (state, action) => {
            const { _id, title, text, userID, color, image, background, pin, archive, trash, createdAt, updatedAt } = action.payload;
            state.notes = state.notes.map((item) => item._id === action.payload._id ? { ...item, title, text, userID, color, background, pin, archive, image, trash, createdAt, updatedAt, _id } : item)
        },
        addTrashNote: (state, action) => {
            state.trashNote = action.payload;
        },
        restoreTrashNote: (state, action) => {
            const { _id, title, text, userID, color, image, background, pin, archive, trash, createdAt, updatedAt } = action.payload;
            state.trashNote = state.trashNote.filter((item) => item._id !== action.payload);
            state.notes = [...state.notes, { _id, title, text, userID, color, image, background, pin, archive, trash, createdAt, updatedAt }]
        },
        deleteNoteEver: (state, action) => {
            state.trashNote = state.trashNote.filter((item) => item._id !== action.payload);
        },
    },
    extraReducers: {
        [pinNote.pending]: (state, action) => {
            state.loading = true;
        },
        [pinNote.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.meta.arg;

            if (id) {
                const updateNote = [...state.notes];
                const index = updateNote.findIndex((note) => note._id === id);
                updateNote[index] = {
                    ...updateNote[index], pin: updateNote[index].pin === true ? false : true,
                }
                state.notes = updateNote;
            }
        },
        [pinNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [colorNote.pending]: (state, action) => {
            state.loading = true;
        },
        [colorNote.fulfilled]: (state, action) => {
            state.loading = false;
            const { id, color } = action.meta.arg;

            if (id && color) {
                const updateNote = [...state.notes];
                const index = updateNote.findIndex((note) => note._id === id);
                updateNote[index] = {
                    ...updateNote[index], color: color
                }
                state.notes = updateNote;
            }
        },
        [colorNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateText.pending]: (state, action) => {
            state.loading = true;
        },
        [updateText.fulfilled]: (state, action) => {
            state.loading = false;
            const { id, text } = action.meta.arg;


            if (id && text) {
                const updateNote = [...state.notes];
                const index = updateNote.findIndex((note) => note._id === id);
                updateNote[index] = {
                    ...updateNote[index], text: text
                }
                state.notes = updateNote;
            }
        },
        [updateText.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [backgroundNote.pending]: (state, action) => {
            state.loading = true;
        },
        [backgroundNote.fulfilled]: (state, action) => {
            state.loading = false;
            const { id, background } = action.meta.arg;

            if (id && background) {
                const updateNote = [...state.notes];
                const index = updateNote.findIndex((note) => note._id === id);
                updateNote[index] = {
                    ...updateNote[index], background: background
                }
                state.notes = updateNote;
            }
        },
        [backgroundNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },


        [updateTodo.pending]: (state, action) => {
            state.loading = true;
        },
        [updateTodo.fulfilled]: (state, action) => {
            state.loading = false;
            const { id, todo } = action.meta.arg;

            if (id && todo) {
                const updateNote = [...state.notes];
                const index = updateNote.findIndex((note) => note._id === id);
                updateNote[index] = {
                    ...updateNote[index], todo: todo
                }
                state.notes = updateNote;
            }
        },
        [updateTodo.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateImage.pending]: (state, action) => {
            state.loading = true;
        },
        [updateImage.fulfilled]: (state, action) => {
            state.loading = false;
            // const { id } = action.meta.arg
        },
        [updateImage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteNote.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteNote.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.meta.arg;
            console.log(action.meta.arg);
            if (id) {
                state.notes = state.notes.filter((item) => item._id !== id);
                state.trashNote = state.trashNote.filter((item) => item._id !== id);
            }
        },
        [deleteNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [archiveNote.pending]: (state, action) => {
            state.loading = true;
        },

        [archiveNote.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.meta.arg;
            if (id) {
                state.notes = state.notes.filter((item) => item._id !== id);
                state.archiveNotes = state.archiveNotes.filter((item) => item._id !== id);
            } else {
                return;
            }

        },
        [archiveNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteNoteForever.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteNoteForever.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.meta.arg
            if (id) {
                state.trashNote = state.trashNote.filter((item) => item._id !== id);
            }
        },
        [deleteNoteForever.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        // [filteredNote.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [filteredNote.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     console.log(action.meta);
        //     // const { id } = action.meta.arg
        //     // if (id) {
        //     //     state.trashNote = state.trashNote.filter((item) => item._id !== id);
        //     // }
        // },
        // [filteredNote.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },
    }
});

export const { changeView, createNote, upgradeNote, addTrashNote, removeTrashNote, removeArchiveNote, deleteNoteEver, restoreTrashNote, getArchiveNotes, addNote,searchNotes } = noteSlice.actions;
export default noteSlice.reducer;
