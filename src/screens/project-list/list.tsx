import { Dropdown, Menu, Modal, Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";

import { useDeleteProject, useEditProject } from "../../utils/use-project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModel, useProjectQueryKey } from "./util";
import { Project } from "../../type/project";
import { User } from "../../type/user";

interface listProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: listProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  const PinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={PinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={"projects/" + String(project.id)}> {project.name}</Link>
            );
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project, index) {
            return (
              <span key={index}>
                {users.find((user) => project.personId === user.id)?.name ??
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project, index) {
            return (
              <span key={index}>
                {value.created ? dayjs(value.created).format("YYYY-MM-DD") : ""}
              </span>
            );
          },
        },
        {
          render(value, project, index) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};
const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModel();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"}>
            <ButtonNoPadding type={"link"} onClick={editProject(project.id)}>
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key={"delete"}>
            <ButtonNoPadding
              type={"link"}
              onClick={() => confirmDeleteProject(project.id)}
            >
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>... </ButtonNoPadding>
    </Dropdown>
  );
};
