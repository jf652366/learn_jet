import { useAsync } from "./use-async";
import { useEffect } from "react";

import { useHttp } from "./http";
import { User } from "../type/user";

export const useUser = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("users"));
  }, [param]);
  return result;
};
