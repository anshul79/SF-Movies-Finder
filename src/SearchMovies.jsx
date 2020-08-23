import React, { useState } from "react";

class SearchParams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      locations: []
    };
  }

  fetchUniqueMovies(jsonResponse) {
    let arr = [];
    let mySet = new Set();

    jsonResponse.map(item => {
      if (item.locations) {
        mySet.add(item.locations);
      }
    });
    arr = Array.from(mySet);
    
    return arr;
  }

  componentDidMount() {
    fetch("https://data.sfgov.org/resource/yitu-d5am.json")
      .then((res) => res.json())
      .then(
        (result) => {
          var uniqueLocations = this.fetchUniqueMovies(result);
          this.setState({
            isLoaded: true,
            items: result,
            locations: uniqueLocations
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
    const { error, isLoaded, items, locations } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="serach-params">
          <form>
            <label htmlFor="location">
              Enter your Location:
              <input
                id="location"
                type="text"
                name="mylocation"
              />
            </label>
            <button id="movie-submit">Submit</button>
          </form>
          <br />
          <br />
          All locations:
          <ul>
            {locations.map(item => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
};

export default SearchParams;
