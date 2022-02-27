import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import Layout from "./components/Layout/Layout";
import Auth from "./pages/Auth/Auth";
import Diary from "./pages/Diary/Diary";
import ErrorPage from "./pages/Error/ErrorPage";
import FirstPage from "./pages/FirstPage";

function App() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {authenticated && <Redirect to="/diary" />}
          {!authenticated && <FirstPage />}
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/diary">
          {!authenticated && <Redirect to="/" />}
          {authenticated && <Diary />}
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
