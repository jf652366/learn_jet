/* @jsxImportSource @emotion/react */

import React from "react";
import { Input, Select, Form } from "antd";
import { Project } from "./list";
import { UserSelect } from "../../components/user-select";

export interface User {
  token: string;
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
}

interface searchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: searchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: searchPanelProps) => {
  return (
    <Form layout={"inline"} css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          defaultOptionName={"负责人"}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
