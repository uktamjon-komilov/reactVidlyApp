import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Likes from "./common/like";
import Pagination from "./common/pagination";
import {paginate} from '../utils/paginate';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
    };

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies: movies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    }

    render() {
        let count = this.state.movies.length;
        if(count === 0)
            return (<p>There are no movies in the database.</p>);
        
        const {pageSize, currentPage, movies: allMovies} = this.state;

        const movies = paginate(allMovies, currentPage, pageSize);

        return (
            <React.Fragment>
                <p>Showing {count} movies in the database</p>
                <table className="table">
                    <thead style={{fontWeight: 'bold'}}>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th>Likes</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Likes liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(movie)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}/>
            </React.Fragment>
        );
    }
}
 
export default Movies;