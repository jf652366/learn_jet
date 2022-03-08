import React, { useState } from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes } from "react-router";
import { ProjectScreen } from "./screens/project-screen";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "./utils";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectProver } from "./components/project-prover";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route index element={<ProjectListScreen />} />
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};
const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ padding: 0 }} type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </Button>
        <ProjectProver />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  const menu = (
    <Menu>
      <Menu.Item key={"123"}>
        <Button type={"link"} onClick={logout}>
          登出
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        hi {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;
const Main = styled.main`
  height: calc(100vh - 6rem);
  display: flex;
  overflow: hidden;
`;
