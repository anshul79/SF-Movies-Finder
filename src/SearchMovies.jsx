import React, { useState } from "react";

const SearchParams = () => {
  const [location, setLocation] = useState("San Francisco");

  return (
    <div className="serach-params">
      <h1>{location}</h1>
      <form>
        <label htmlFor="location">
          Enter your Location:
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
