import { User } from "./search-panel";
import { Dropdown, Menu, Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";

import { useEditProject } from "../../utils/use-project";
import { ButtonNoPadding } from "../../components/lib";
import { useDispatch } from "react-redux";
import { ProjectListActions } from "./project-list.slice";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface listProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  projectButton: JSX.Element;
}

export const List = ({ users, ...props }: listProps) => {
  const { mutate } = useEditProject();
  const dispatch = useDispatch();
  const PinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
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
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNoPadding
                        type={"link"}
                        onClick={() =>
                          dispatch(ProjectListActions.openProjectModal())
                        }
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>... </ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
