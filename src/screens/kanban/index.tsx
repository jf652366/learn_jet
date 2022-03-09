import { useDocumentTitle } from "../../utils";
import { useKanban } from "../../utils/kanban";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModel } from "./task-model";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanban, isLoading: kanbanIsLoading } = useKanban(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1> {currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanban?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    index={index}
                    draggableId={"kanban" + kanban.id}
                  >
                    <KanbanColumn key={kanban.id} kanban={kanban} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>

            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModel />
      </ScreenContainer>
    </DragDropContext>
  );
};
const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
