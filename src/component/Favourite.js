import React, { Component } from "react";
import { movies } from "./getMovies";
// import { movies } from "./getMovies";
export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genre: [],
      movies: [],
      currGenre: "All Genre",
      currText: "",
      limit: "5",
      currPage: "1",
    };
  }
  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies") || "[]");
    let temp = [];
    data.map((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    temp.unshift("All Genre");
    this.setState({
      genre: [...temp],
      movies: [...data],
    });
    console.log(this.state.movies);
  }
  handleGenre = (genre) => {
    this.setState({
      currGenre: genre,
    });
  };
  handleInputChange = (event) => {
    this.setState(
      {
        currText: event.target.value,
      },
      console.log(this.state.currText)
    );
  };
  handleInputRow = (event) => {
    this.setState(
      {
        limit: event.target.value,
      },
      console.log(this.state.limit)
    );
  };
  handleSortIncPop = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };
  handleSortDecPop = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.popularity - objA.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };
  handleSortIncRat = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
    this.setState({
      movies: [...temp],
    });
  };
  handleSortDecRat = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
    this.setState({
      movies: [...temp],
    });
  };
  handlePagination = (page) => {
    this.setState({
      currPage: page,
    });
  };
  handleDelete = (id) => {
    console.log(id);
    let newarr = this.state.movies.filter((movieObj)=>movieObj.id!=id) 
    
    this.setState({
      movies: [...newarr],
    });
    console.log(movies);
    localStorage.setItem("movies", JSON.stringify(newarr));
  };
  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filterarr = [];
    if (this.state.currText == "") {
      filterarr = [...this.state.movies];
    } else {
      filterarr = this.state.movies.filter((movieObj) => {
        let temp = movieObj.original_title.toLowerCase();
        return temp.includes(this.state.currText.toLowerCase());
      });
    }
    if (this.state.currGenre != "All Genre") {
      filterarr = this.state.movies.filter(
        (movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currGenre
      );
    }

    let pages = Math.ceil(
      filterarr.length / (this.state.limit > 0 ? this.state.limit : 1)
    );
    let pagesarr = [];
    for (let i = 1; i <= pages; i++) {
      pagesarr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = +si + +this.state.limit;
    filterarr = filterarr.slice(si, ei);
    // console.log(si,ei);
    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-3">
                <ul className="list-group favourites-genres">
                  {this.state.genre.map((value) =>
                    this.state.currGenre == value ? (
                      <li
                        className="list-group-item"
                        style={{
                          background: "#3F50B6",
                          color: "#FFFFFF",
                          fontWeight: "bold",
                        }}
                      >
                        {value}
                      </li>
                    ) : (
                      <li
                        className="list-group-item"
                        style={{ background: "#FFFFFF", color: "#3F50B6" }}
                        onClick={() => this.handleGenre(value)}
                      >
                        {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="col-9 favourites-table">
                <div className="row">
                  <input
                    type="text"
                    className="input-group-text col"
                    placeholder="Search"
                    value={this.state.currText}
                    onChange={this.handleInputChange}
                  ></input>
                  <input
                    type="number"
                    className="input-group-text col"
                    placeholder="Rows count"
                    value={this.state.limit}
                    onChange={this.handleInputRow}
                  ></input>
                </div>
                <div className="row">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">
                          <i
                            class="fa-solid fa-sort-up"
                            onClick={this.handleSortDecPop}
                          />
                          Popularity
                          <i
                            class="fa-solid fa-sort-down"
                            onClick={this.handleSortIncPop}
                          />
                        </th>
                        <th scope="col">
                          <i
                            class="fa-solid fa-sort-up"
                            onClick={this.handleSortDecRat}
                          />
                          Rating
                          <i
                            class="fa-solid fa-sort-down"
                            onClick={this.handleSortIncRat}
                          />
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterarr.map((movieObj) => (
                        <tr>
                          <th scope="row">
                            <img
                              src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                              alt={movieObj.title}
                              style={{ width: "7rem" }}
                            ></img>{" "}
                            {movieObj.original_title}
                          </th>
                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => this.handleDelete(movieObj.id)}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {pagesarr.map((page) => (
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={() => this.handlePagination(page)}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
