import { User } from "../screens/project-list/search-panel";
import { useAsync } from "./use-async";
import { useEffect } from "react";

import { useHttp } from "./http";

export const useUser = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("users"));
  }, [param]);
  return result;
};
