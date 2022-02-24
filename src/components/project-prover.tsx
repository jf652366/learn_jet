import { Button, Divider, List, Popover, Typography } from "antd";
import { useProject } from "../utils/use-project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";

export const ProjectProver = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: Projects } = useProject();
  const pinnedProjects = Projects?.filter((projects) => projects.pin);
  const Content = (
    <Contentcontainer>
      <Typography.Text type={"secondary"}>搜藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type={"link"}
        onClick={() => props.setProjectModalOpen(true)}
      >
        创建项目
      </ButtonNoPadding>
    </Contentcontainer>
  );
  return (
    <Popover placement={"bottom"} content={Content}>
      <span>项目 </span>
    </Popover>
  );
};
const Contentcontainer = styled.div`
  min-width: 30rem;
`;
