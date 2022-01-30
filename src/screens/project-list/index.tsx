import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "../../utils/use-project";
import { useUser } from "../../utils/use-user";
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProject(debouncedParam);
  const { data: users } = useUser();
  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}

      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
