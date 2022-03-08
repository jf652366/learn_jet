import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Task } from "../type/task";

export const useTasks = (param?: {
  processorId: string | undefined;
  tagId: string | undefined;
  name: string;
  typeId: string | undefined;
  projectId: number;
}) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", {
      data: param,
    })
  );
};
