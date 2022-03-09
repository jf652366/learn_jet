import { Kanban } from "../../type/kanban";
import { useTasks } from "../../utils/task";
import {
  useKanbansQueryKey,
  useTasksModel,
  useTasksSearchParams,
} from "./util";
import { useTasksType } from "../../utils/task-type";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "../../type/task";
import { Mark } from "../../components/mark";
import { useDeleteKanban } from "../../utils/kanban";
import { Row } from "../../components/lib";
import React from "react";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskType } = useTasksType();
  const name = taskType?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img src={name === "task" ? taskIcon : bugIcon} alt={""} />;
};
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModel();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        <Mark key={task.id} name={task.name} keyword={keyword} />
      </p>

      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};
export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const task = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container {...props} ref={ref}>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More key={kanban.id} kanban={kanban} />
      </Row>
      <TaskContainer>
        <Drop
          droppableId={"task" + kanban.id}
          type={"ROW"}
          direction={"vertical"}
        >
          <DropChild>
            {task?.map((task, index) => (
              <Drag draggableId={"task" + task.id} key={task.id} index={index}>
                <div>
                  <TaskCard key={task.id} task={task} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
});
const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item key={"hell"}>
        <Button type={"link"} onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};
export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(241, 242, 246);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;
const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
