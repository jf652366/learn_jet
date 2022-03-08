import { useLocation } from "react-router";
import { useProject } from "../../utils/use-project";
import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
export const useProjectInUrl = () => useProject(useProjectIdInUrl());
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];
export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      name: param.name,
      typeId: param.typeId || undefined,
      processorId: param.processorId || undefined,
      tagId: param.tagId || undefined,
    }),
    [projectId, param]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
