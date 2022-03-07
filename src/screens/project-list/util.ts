import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "../../utils/use-project";
//项目列表搜索参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};
export const useProjectModel = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const open = () =>
    setProjectCreate({
      projectCreate: true,
    });
  // {
  //     console.log(123)
  //     setProjectCreate({projectCreate: false});
  //     setEditingProjectId({editingProjectId: undefined})
  // }
  const close = () => {
    setProjectCreate({ projectCreate: undefined });
    if (editingProjectId) {
      setEditingProjectId({ editingProjectId: undefined });
    }
  };
  //
  const startEdit = (id: number) =>
    setEditingProjectId({
      editingProjectId: id,
    });

  return {
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    isLoading,
    editingProject,
    startEdit,
  };
};
