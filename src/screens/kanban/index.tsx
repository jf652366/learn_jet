import { useDocumentTitle } from "../../utils";
import { useKanban } from "../../utils/kanban";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanban } = useKanban(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h1> {currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanban?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};
const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
