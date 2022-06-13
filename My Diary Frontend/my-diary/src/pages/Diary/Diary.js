import { useState } from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router";
import DiaryList from "./DiaryList";
import ReadDiary from "./ReadDiary";
import WriteDiaryScreen from "./WriteDiaryScreen/WriteDiaryScreen";

const checkIfEdit = (currentDiary, location) => {
  if (!currentDiary) return false;
  const queryParams = new URLSearchParams(location.search);
  if (queryParams.get("editId") === currentDiary._id) {
    return true;
  }
  return false;
};

const Diary = () => {
  const [currentDiary, setCurrentDiary] = useState();

  const routerMatch = useRouteMatch();
  const location = useLocation();

  const isEditMode = checkIfEdit(currentDiary, location);

  return (
    <Switch>
      <Route path={routerMatch.path} exact>
        <DiaryList />
      </Route>
      <Route path={`${routerMatch.path}/write`}>
        <WriteDiaryScreen />
      </Route>
      <Route path={`${routerMatch.path}/read`}>
        <ReadDiary onReadDiary={setCurrentDiary} />
      </Route>
    </Switch>
  );
};

export default Diary;
