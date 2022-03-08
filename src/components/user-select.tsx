import { useUser } from "../utils/use-user";
import { IdSelect } from "./id-select";
import React from "react";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUser();
  return (
    <IdSelect options={users || []} {...props}>
      {" "}
    </IdSelect>
  );
};
