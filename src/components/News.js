import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes, { String } from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }
  document.title = `${capitalizeFirstLetter(props.category)} - News`
  const updateNews = async () => {
    props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=031176a102734f768c19459b50f55074&page=${page}&PageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json()
    props.setProgress(70)
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    updateNews();
  }, [])

  // handlePrevClick = async () => {
  // setPage(page-1)
  // updateNews()
  // }

  // handleNextClick = async () => {
  //   setpage(page+1)
  //   updateNews()
  // }
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=031176a102734f768c19459b50f55074&page=${page + 1}&PageSize=${props.pageSize}`;
    setPage(page + 1)
    // setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json()
    setArticles(articles.concat(parseData.articles))
      setTotalResults(parseData.totalResults)
  };
  return (
    <div className="container my-3">
      <h1 className="text-center my-3"><strong>News Top {capitalizeFirstLetter(props.category)} Headlines</strong></h1>
      {loading && <Spinner/>}
      <InfiniteScroll style={{ overflow: 'hidden' }}
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={setLoading && <Spinner/>}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title.slice(0, 45)}
                  description={!element.description ? "Speculation is growing as to whether President Trump's tariff plan is actually designed it into a recession...." : element.description.slice(0, 95)}
                  imgUrl={element.urlToImage} newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name} />
              </div>

            })}


          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container">
        <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" id="abc" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/props.pageSize)}type="button" id="abc" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
        </div> */}
    </div>
  )
}
News.defaultProps = {
  country: 'us',
  pageSize: 12,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.string,
  category: PropTypes.string,
}
export default News;
