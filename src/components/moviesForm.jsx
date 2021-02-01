import React from "react";

const MoviesForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.replace("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MoviesForm;
