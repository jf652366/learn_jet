import { Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      width={"100%"}
      visible={props.projectModalOpen}
    >
      <h1>Project Model</h1>
      <button onClick={props.onClose}>关闭</button>
    </Drawer>
  );
};
