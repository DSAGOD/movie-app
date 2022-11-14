import React, { Component } from "react";
import { movies } from "./getMovies";
export default class Banner extends Component {
  render() {
    // console.log(this.state.movies);
    let movie = movies.id;
    let path = movies.backdrop_path;
    return (
      <>
        {movie == "" ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="card banner-card" >
            <img src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`} className="card-img-top banner-img" alt="..." />
          
              <h2 className="card-title banner-title">{movies.title}</h2>
              <p className="card-text banner-text">
                {movies.overview}
              </p>
              
          
          </div>
        )}
      </>
    );
  }
}
