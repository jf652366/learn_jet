/* @jsxImportSource @emotion/react */

import React from "react";
import { Form, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { Project } from "../../type/project";
import { User } from "../../type/user";

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
