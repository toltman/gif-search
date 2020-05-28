import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true,
    };
  }

  componentDidMount() {
    /* Using fetch */
    // fetch("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC")
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     this.setState({ gifs: responseData.data });
    //   })
    //   .catch((error) => {
    //     console.log("Error fetching and parsing data", error);
    //   });

    /* Using axios */
    axios
      .get(
        `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
      )
      .then((response) => {
        this.setState({
          gifs: response.data.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }

  performSearch = (query) => {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
      )
      .then((response) => {
        this.setState({
          gifs: response.data.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            <GifList data={this.state.gifs} />
          )}
        </div>
      </div>
    );
  }
}
