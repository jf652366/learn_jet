import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/use-project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModel } from "../screens/project-list/util";

export const ProjectProver = () => {
  const { data: Projects } = useProjects();
  const pinnedProjects = Projects?.filter((projects) => projects.pin);
  const { open } = useProjectModel();
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
      <ButtonNoPadding type={"link"} onClick={open}>
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
