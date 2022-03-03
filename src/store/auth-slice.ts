import { User } from "../screens/project-list/search-panel";
import { createSlice } from "@reduxjs/toolkit";
import * as auth from "auth-provider";
import { AuthForm, initUser } from "../context/auth-context";
import { AppDispatch, RootState } from "./index";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((users) => dispatch(setUser(users)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((users) => dispatch(setUser(users)));
export const localOut = () => (dispatch: AppDispatch) =>
  auth.localOut().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) =>
  initUser().then((users) => dispatch(setUser(users)));
