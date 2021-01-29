import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import Likes from "./common/like";
import Pagination from "./common/pagination";
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import { get } from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
    };

    componentDidMount(){
        const genres = [{name: "All Movies"}, ...getGenres()]
        this.setState({movies: getMovies(), genres});
    }

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

    handleGenreSelect = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1,
        });
    }

    render() {
        let count = this.state.movies.length;
        if(count === 0)
            return (<p>There are no movies in the database.</p>);
        
        const {pageSize, currentPage, selectedGenre, movies: allMovies} = this.state;

        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const movies = paginate(filtered, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}   
                    />
                </div>
                <div className="col">
                    <p>Showing {filtered.length} movies in the database</p>
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
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}/>
                </div>
            </div>
        );
    }
}
 
export default Movies;