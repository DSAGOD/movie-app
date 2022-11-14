import React, { Component } from "react";
import axios from "axios";
import { movies } from "./getMovies";
import Banner from "./Banner";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      currpage: 1,
      movies: [],
      parr: [1],
      favourite:[],
    };
  }
  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=9eb78eb9780fcfef34045dce50350f41&language=en-US&page=${this.state.currpage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
    // console.log(movies);
    let oldData = JSON.parse(localStorage.getItem('movies')||"[]");
    let temp=oldData.map((value)=>value.id);
    this.setState({
      favourite:[...temp],
    })
  }
  changeMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=9eb78eb9780fcfef34045dce50350f41&language=en-US&page=${this.state.currpage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  };
  handleRight = async () => {
    let temparr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      temparr.push(i);
    }
    this.setState(
      {
        currpage: this.state.currpage + 1,
        parr: [...temparr],
      },
      this.changeMovies
    );
  };
  handleLeft = async () => {
    if (this.state.currpage != 1) {
      this.setState(
        {
          currpage: this.state.currpage - 1,
        },
        this.changeMovies
      );
    }
  };
  handleClick = (value) => {
    if (this.state.currpage != value)
      this.setState({
        currpage: value,
      },this.changeMovies);
  };
  handleFavourite=(movie)=>{
    let oldData = JSON.parse(localStorage.getItem('movies')||"[]");
    if(this.state.favourite.includes(movie.id))
    {
      oldData = oldData.filter((moviesObj)=>moviesObj.id!=movie.id) ;
    }
    else
    {
      oldData.push(movie);
    }
    localStorage.setItem("movies",JSON.stringify(oldData));
    this.handlesetFavourite();
    // console.log(oldData);
  };
  handlesetFavourite=()=>{
    let oldData = JSON.parse(localStorage.getItem('movies')||"[]");
    let temp=oldData.map((value)=>value.id);
    this.setState({
      favourite:[...temp],
    })
  }
  render() {
    // console.log("render is called");
    return (
      <>
      <Banner/>
        <h3 className="text-center">
          <strong>Trending</strong>
        </h3>
        {this.state.movies.length == 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <div className="movies-list">
              {this.state.movies.map((moviesObj) => (
                <div
                  className="card movies-card"
                  onMouseEnter={() => {
                    this.setState({
                      hover: moviesObj.id,
                    });
                  }}
                  onMouseLeave={() => {
                    this.setState({
                      hover: "",
                    });
                  }}
                >
                <img
                    src={`https://image.tmdb.org/t/p/original${moviesObj.poster_path}`}
                    className="card-img-top movies-img"
                    alt="..."
                    
                  />
               
                  {/* <div className="card-body"> */}
                  <h1 className="card-title movies-title" >
                    {moviesObj.original_title}
                  </h1>
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover == moviesObj.id && (
                      <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourite(moviesObj)}>
                        {
                        this.state.favourite.includes(moviesObj.id)?"Remove from Favourites":"Add to Favourites"
                        }
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleLeft}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((value) => (
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => this.handleClick(value)}
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleRight}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
