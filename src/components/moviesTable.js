import React from "react";
import Likes from "./common/like";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, onSort } = props;
  return (
    <table className="table">
      <thead style={{ fontWeight: "bold" }}>
        <th onClick={() => onSort("title")}>Title</th>
        <th onClick={() => onSort("genre.name")}>Genre</th>
        <th onClick={() => onSort("numberInStock")}>Stock</th>
        <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
        <th>Likes</th>
        <th></th>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Likes liked={movie.liked} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
