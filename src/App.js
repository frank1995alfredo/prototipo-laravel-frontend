import React from "react";
import User from "./User/User";
import Login from "./Login/Login";
import useToken from "./config/useToken";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

function App() {
  const hist = createBrowserHistory();

  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={User}  />
        
      </Switch>
    </Router>
  );
}

export default App;
