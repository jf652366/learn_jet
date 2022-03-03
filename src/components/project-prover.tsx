import { Button, Divider, List, Popover, Typography } from "antd";
import { useProject } from "../utils/use-project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import React from "react";
import { useDispatch } from "react-redux";
import { ProjectListActions } from "../screens/project-list/project-list.slice";
export const ProjectProver = () => {
  const { data: Projects } = useProject();
  const pinnedProjects = Projects?.filter((projects) => projects.pin);
  const dispatch = useDispatch();
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
        onClick={() => dispatch(ProjectListActions.openProjectModal())}
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
