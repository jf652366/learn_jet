import { Task } from "../type/task";
import { useHttp } from "./http";
import { useQuery } from "react-query";

export const useTasksType = () => {
  const client = useHttp();
  return useQuery<Task[]>(["taskTypes"], () => client("taskTypes"));
};
