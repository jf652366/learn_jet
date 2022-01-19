import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const client = useHttp();
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  //获取用户列表数据
  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
