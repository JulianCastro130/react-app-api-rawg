import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
    </div>
  );
}

export default App;




