import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';

class Movies extends Component {
    state = {
        movies: getMovies(),
    };

    handleDelete = (movie) =>{
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies: movies});
    }

    render() {
        if(this.state.movies.length === 0)
            return (<p>There are no movies in the database.</p>);
        return (
            <React.Fragment>
                <p>Showing {this.state.movies.length} movies in the database</p>
                <table class="table">
                    <thead style={{fontWeight: 'bold'}}>
                        <td>Title</td>
                        <td>Genre</td>
                        <td>Stock</td>
                        <td>Rate</td>
                        <td></td>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(movie)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
 
export default Movies;