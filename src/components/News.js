import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 100,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8d6e8c5e5d0d49d480b47634484ea03f&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      loading: false,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=8d6e8c5e5d0d49d480b47634484ea03f&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      loading: false,
      articles: parsedData.articles,
      page: this.state.page - 1,
      totalResults: parsedData.totalResults,
    });
  };

  handleNextClick = async () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=8d6e8c5e5d0d49d480b47634484ea03f&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        loading: false,
        articles: parsedData.articles,
        page: this.state.page + 1,
        totalResults: parsedData.totalResults,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Newbar - Top headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={
                    element.title.length != null
                      ? element.title.slice(0, 44) + "..."
                      : ""
                  }
                  description={
                    element.description != null
                      ? element.description.slice(0, 44) + "..."
                      : ""
                  }
                  imageUrl={
                    element.urlToImage != null
                      ? element.urlToImage
                      : "https://www.hindustantimes.com/ht-img/img/2023/12/24/1600x900/ISRAEL-PALESTINIANS-SHIPPING-OIL-0_1703394191794_1703394206730.JPG"
                  }
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousClick}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
