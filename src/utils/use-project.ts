import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  /*   ['projects',param],'projects' 可以2种方式传递
     1 相当于 useEffect 第一个参数 为存储时的键 第二个参数为依赖项目
     2  直接传递字符串  指定存储键值为当前字符串
     */
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", {
      data: param,
    })
  );
};
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
