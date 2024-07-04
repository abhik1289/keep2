import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userInfo = Cookies.get("userInfo") ?
    JSON.parse(Cookies.get("userInfo")) : Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
const initialValues = {
    auth: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    lables: Cookies.get("labels") ? JSON.parse(Cookies.get("labels")) : [],
    info: {
        first_name: userInfo?.first_name,
        last_name: userInfo?.last_name,
        profile_photo: userInfo?.profile_photo,
    }

}

const authSlice = createSlice({
    name: "user",
    initialState: initialValues,
    reducers: {
        login: (state, action) => {
            state.auth = action.payload;
        },
        signup: (state, action) => {
            state.auth = action.payload;
        },
        logout: (state, action) => {
            state.auth = null;
            state.info = {};
        },
        changeName: (state, action) => {
            state.info.first_name = action?.payload?.first_name;
            state.info.last_name = action?.payload?.last_name;
            state.info.profile_photo = action?.payload?.profile_photo;
        },
        setLables: (state, action) => {
            state.lables = action.payload;
        },
        addLable: (state, action) => {
            state.lables = action.payload
        },
        deleteLable: (state, action) => {
            state.lables = state.lables.filter((item) => item.labelID !== action.payload);
        },
        updateLabel: (state, action) => {
            state.lables = state.lables.map((item) => item.labelID === action.payload.labelID ? { ...item, title: action.payload.title } : item);
        }
    }
});


export const { login, signup, logout, changeName, addLable, deleteLable, updateLabel, setLables } = authSlice.actions;

export default authSlice.reducer;
