//乐观更新封装
import { QueryKey, useQueryClient } from "react-query";
import { Project } from "../screens/project-list/list";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    //刚开始出发时调用
    async onMutate(target: any) {
      const previousItems = queryClient.getQueriesData(queryKey);
      queryClient.setQueriesData(queryKey, (old?: any[]) => {
        return callback(target, old);
        return (
          old?.map((project) =>
            project.id === target.id ? { ...project, ...target } : project
          ) || []
        );
      });
      return previousItems;
    },
    //报错时使用
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueriesData(
        queryKey,
        (context as { previousItems: Project[] }).previousItems
      );
    },
  };
};
//删除
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
//编辑
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
//添加
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
