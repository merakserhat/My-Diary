import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Forgotten from "./Forgotten";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import ChangePassword from "./ChangePassword";

const Auth = () => {
  const routerMatch = useRouteMatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  return (
    <Switch>
      <Route path={`${routerMatch.path}/login`}>
        {authenticated && <Redirect to="/" />}
        <Login />
      </Route>
      <Route path={`${routerMatch.path}/register`}>
        {authenticated && <Redirect to="/" />}
        <Register />
      </Route>
      <Route path={`${routerMatch.path}/forgotten`}>
        {authenticated && <Redirect to="/" />}
        <Forgotten />
      </Route>
      <Route path={`${routerMatch.path}/reset/:token`}>
        {authenticated && <Redirect to="/" />}
        <Reset />
      </Route>
      <Route path={`${routerMatch.path}/change-password`}>
        {!authenticated && <Redirect to="/" />}
        <ChangePassword />
      </Route>
      <Route path={`${routerMatch.path}/`}>
        <Redirect to={`${routerMatch.path}/register`} />
      </Route>
    </Switch>
  );
};

export default Auth;
