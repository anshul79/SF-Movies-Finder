import React from "react";
import { render } from "react-dom";
import SearchMovies from "./SearchMovies";

class App extends React.Component {
  componentDidMount() {
    fetch("https://data.sfgov.org/resource/yitu-d5am.json")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

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
