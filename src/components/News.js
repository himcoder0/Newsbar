import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `NewsBar - ${capitalizeFirstLetter(props.category)}`;

  const updateNews = async (pageNumber) => {
    if (pageNumber === 1) {
      props.setProgress(0);
    }
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNumber}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    if (pageNumber === 1) {
      props.setProgress(30);
    }
    let parsedData = await data.json();
    if (pageNumber === 1) {
      props.setProgress(70);
    }
    setLoading(false);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    if (pageNumber === 1) {
      props.setProgress(100);
    }
  };

  useEffect(() => {
    updateNews(1);
  }, []);

  const fetchMoreData = async () => {
    updateNews(page + 1);
    setPage(page + 1);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "64px" }}>
        Newbar - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
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
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
  setProgress: {},
  apiKey: "",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
};

export default News;
