import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import GameList from "../GameList/GameList";
import GameDetails from "../GameDetails/GameDetails";
import NewGameForm from "../NewGameForm/NewGameForm";
import Header from "../Header/Header";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          <GameList />
        </Route>
        <Route path="/details">
          <GameDetails />
        </Route>
        <Route path="/addgame" exact>
          <NewGameForm />
        </Route>
      </Router>
    </div>
  );
}

export default App;
