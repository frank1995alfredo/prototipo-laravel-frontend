import React from "react";
import User from "../User/User";
import Admin from "../Admin/Admin";
import Login from "../Login/Login";
import NoPage from "../NoPage/404";
import useToken from "../config/useToken";
import useUser from "../config/useUser";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
import PrivateRouteUser from "../routes/PrivateRouteUser";

function App() {


  const { token, setToken } = useToken();
  const { user, setUser } = useUser();

  return (
    <Router>
      <Switch>
        
        <Route exact path="/signig">
          <Redirect to="/" />
        </Route>

        <PrivateRouteUser exact path="/user" component={User} />
        <PrivateRoute exact path="/admin" component={Admin} />

        
        <Route path="/data">
            <h1>Data</h1>
        </Route>

        <Login setToken={setToken} setUser={setUser}  exact path="/" component={Login} />

        <Route path="*" exact component={NoPage} />
      </Switch>
    </Router>
  );
}

export default App;
