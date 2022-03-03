import { SearchPanel } from "./search-panel";
import { List } from "./list";

import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProject } from "../../utils/use-project";
import { useUser } from "../../utils/use-user";

import { useProjectSearchParams } from "./util";
import { ButtonNoPadding, Row } from "../../components/lib";
import { ProjectListActions } from "./project-list.slice";
import { useDispatch } from "react-redux";
import React from "react";

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectSearchParams();
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProject(useDebounce(param, 200));
  const { data: users } = useUser();
  //dispatch(ProjectListActions.openProjectModal()
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          type={"link"}
          onClick={() => dispatch(ProjectListActions.openProjectModal())}
        >
          创建项目
        </ButtonNoPadding>
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        projectButton={props.projectButton}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
  padding: 3.2rem;
`;
