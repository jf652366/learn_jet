import { Drawer } from "antd";
import { useDispatch } from "react-redux";
import {
  ProjectListActions,
  selectProjectModelOpen,
} from "./project-list.slice";
//useSelector 读取根状态树
import { useSelector } from "react-redux";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModelOpen);
  return (
    <Drawer
      onClose={() => dispatch(ProjectListActions.CloseProjectModal())}
      width={"100%"}
      visible={projectModalOpen}
    >
      <h1>Project Model</h1>
      <button onClick={() => dispatch(ProjectListActions.CloseProjectModal())}>
        关闭
      </button>
    </Drawer>
  );
};
