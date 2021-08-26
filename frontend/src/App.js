import React from "react";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./components/home";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              404 not found
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
