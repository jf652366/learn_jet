import { SearchPanel } from "./search-panel";
import { List } from "./list";

import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "../../utils/use-project";
import { useUser } from "../../utils/use-user";

import { useProjectSearchParams } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectSearchParams();
  const { isLoading, error, data: list } = useProject(useDebounce(param, 200));
  const { data: users } = useUser();

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
ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
  padding: 3.2rem;
`;
