import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import { KanbanScreen } from "../kanban-screen";
import { EpicScreen } from "../epic-screen";

import React from "react";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <ul>
        <li>
          <Link to={"kanban"}>看板</Link>
        </li>
        <li>
          <Link to={"epic"}>任务组</Link>
        </li>
      </ul>

      <Routes>
        <Route index element={<KanbanScreen />} />
        <Route path={"kanban"} element={<KanbanScreen />} />
        <Route path={"epic"} element={<EpicScreen />} />
      </Routes>
    </div>
  );
};
