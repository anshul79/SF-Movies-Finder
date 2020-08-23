import React, { useState } from "react";

class SearchParams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      uniqueLocations: [],
      moviesNearLocation: [],
      currentLocation: ""
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  fetchUniqueLocations(jsonResponse) {
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
          var uniqueLocations = this.fetchUniqueLocations(result);
          this.setState({
            isLoaded: true,
            items: result,
            uniqueLocations: uniqueLocations
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

  handleLocationChange(e) {
    this.setState({currentLocation: e.target.value})
  }

  onSubmitClick(e) {
    e.preventDefault();
    console.log('A name was submitted: ' + this.state.currentLocation);
    this.findMoviesForLocation(this.state.currentLocation);
  }

  findMoviesForLocation(location) {
    let arr = [];
    let mySet = new Set();

    this.state.items.map(item => {
      if (item.locations && item.locations === location) {
        mySet.add(item.title);
      }
    });
    arr = Array.from(mySet);
    console.log(arr);

    this.setState({moviesNearLocation: arr});
    return arr;
  }

  render() {
    const { error, isLoaded, items, uniqueLocations, moviesNearLocation } = this.state;
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
              <select
                id="location"
                onChange={this.handleLocationChange}
                onBlur={this.handleLocationChange}
              >
                <option>Type a location</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} val={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </label>
            <button id="movie-submit" onClick={this.onSubmitClick}>Submit</button>
          </form>
          <br />
          <br />
          Movies Near You:
          <ul>
            {moviesNearLocation.map(item => (
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
