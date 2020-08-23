import React from "react";
import { render } from "react-dom";
import SearchMovies from "./SearchMovies";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>San Francisco Movies Finder</h1>
        <br />
        <SearchMovies />
      </div>
    );
  }
}

// to render markup on the screen
render(<App />, document.getElementById("root"));
