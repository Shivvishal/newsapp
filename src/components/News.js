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

  const capitalizeFirstLetter = (string) =>
    string?.charAt(0).toUpperCase() + string?.slice(1);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=031176a102734f768c19459b50f55074&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      const data = await fetch(url);
      props.setProgress(30);
      const parsedData = await data.json();
      props.setProgress(70);
      if (parsedData.status === 'ok' && Array.isArray(parsedData.articles)) {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
      } else {
        console.error('API error:', parsedData);
        setArticles([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Network error:', error);
      setArticles([]);
      setTotalResults(0);
    }
    setLoading(false);
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=031176a102734f768c19459b50f55074&page=${nextPage}&pageSize=${props.pageSize}`;
    setPage(nextPage);
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.status === 'ok' && Array.isArray(parsedData.articles)) {
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
      } else {
        console.error('API error during fetchMoreData:', parsedData);
      }
    } catch (error) {
      console.error('Network error during fetchMoreData:', error);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center my-3">
        <strong>Top {capitalizeFirstLetter(props.category)} Headlines</strong>
      </h1>

      {loading && <Spinner />}

      {!loading && articles.length === 0 && (
        <p className="text-center">No news articles found. Please try again later.</p>
      )}

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
                  title={element.title?.slice(0, 45) || 'No Title'}
                  description={
                    element.description
                      ? element.description.slice(0, 95)
                      : 'No description available...'
                  }
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name || 'Unknown'}
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
  pageSize: 9,
  country: 'us',
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
