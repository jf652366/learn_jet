import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface State {
  projectModelOpen: boolean;
}

const initialState: State = {
  projectModelOpen: false,
};
export const ProjectListSlice = createSlice({
  name: "ProjectListSlice", //表明slice本省
  initialState, //initialState需要进行维护的状态树
  reducers: {
    //纯洁的函数式没有任何副作用的
    openProjectModal(State) {
      State.projectModelOpen = true;
    },
    CloseProjectModal(State) {
      State.projectModelOpen = false;
    },
  },
});
export const ProjectListActions = ProjectListSlice.actions;
export const selectProjectModelOpen = (state: RootState) =>
  state.projectList.projectModelOpen;
