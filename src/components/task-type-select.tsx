import React from "react";
import { IdSelect } from "./id-select";
import { useUser } from "../utils/use-user";
import { useTasksType } from "../utils/task-type";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTasksType();
  return (
    <IdSelect options={taskTypes || []} {...props}>
      {" "}
    </IdSelect>
  );
};
