import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  document.title = `${capitalizeFirstLetter(props.category)} - News`;

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=031176a102734f768c19459b50f55074&page=${page}&PageSize=${props.PageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=031176a102734f768c19459b50f55074&page=${nextPage}&PageSize=${props.PageSize}`;
    setPage(nextPage);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center my-3">
        <strong>News Top {capitalizeFirstLetter(props.category)} Headlines</strong>
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title?.slice(0, 45)}
                  description={
                    element.description
                      ? element.description.slice(0, 95)
                      : 'Speculation is growing as to whether President Trump\'s tariff plan is actually designed to push the economy into a recession...'
                  }
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'us',
  PageSize: 9,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  PageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
