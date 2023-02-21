import React, { useState, useEffect } from 'react'
import './News.css'
import PropTypes from 'prop-types'
import NewsItem from '../NewsItem/NewsItem'
import Spinner from '../Spinner/Spinner'
import InfiniteScroll from "react-infinite-scroll-component"

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // const updateNewsPage = async () => {
  //   props.setProgress(10);

  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

  //   setLoading(true);
  //   let data = await fetch(url);
  //   props.setProgress(30);

  //   let parsedData = await data.json();
  //   props.setProgress(70);

  //   setArticles(parsedData.articles);
  //   setTotalResults(parsedData.totalResults);
  //   setLoading(false);

  //   props.setProgress(100);
  // }

  const updateNewsPage = async () => {
    props.setProgress(10);

    const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=ab433c65ca2c0e5a64033f1b34bc8778`;

    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalArticles);
    setLoading(false);

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - The Gazette`
    updateNewsPage();
    //eslint-disable-next-line
  }, []);

  // const fetchMoreData = async () => {
  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

  //   setPage(page + 1);
  //   let data = await fetch(url);
  //   let parsedData = await data.json();

  //   setArticles(articles.concat(parsedData.articles));
  //   setTotalResults(parsedData.totalResults);
  // }

  const fetchMoreData = async () => {
    const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=ab433c65ca2c0e5a64033f1b34bc8778`;

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalArticles);
  }

  // const handlePrevClick = async () => {
  //   setPage(page - 1);
  //   updateNewsPage();

  //   // this.setState({ page: this.state.page - 1 }, ()=> this.updateNewsPage())
  // }

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNewsPage();

  //   // this.setState({ page: this.state.page + 1 }, ()=> this.updateNewsPage());
  // }

  return (
    <>
      <div className='container my-5'>
        <div>
          <h3 className='mb-4 mainHeading'>{props.category === 'general' ? 'The Gazette - Top News Headlines' : `The Gazette - Top ${capitalizeFirstLetter(props.category)} Headlines`}</h3>
        </div>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}>

          {/* <div className="container">
            <div className='row'>
              {articles.map((element) => {
                return <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={element.url}>
                  <NewsItem title={element.title} description={element.description ? element.description.slice(0, 70) : element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} badgeColor={props.badgeColor} />
                </div>
              })}
            </div> */}

          <div className="container">
            <div className='row'>
              {articles.map((element) => {
                return <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={element.url}>
                  <NewsItem title={element.title} description={element.description ? element.description.slice(0, 70) : element.description} imageUrl={element.image} newsUrl={element.url} author={element.source.name} date={element.publishedAt} source={element.source.name} badgeColor={props.badgeColor} />
                </div>
              })}
            </div>
          </div>

        </InfiniteScroll>

        {/* {!loading && <hr className='mx-3' />}
          <div className="container d-flex justify-content-between">
            <button disabled={page <= 1} type="button" className="btn btn-light pageBtn" onClick={handlePrevClick}>&laquo; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-light pageBtn mr-4" onClick={handleNextClick}>Next &raquo;</button>
          </div> */}
      </div>
    </>
  )
}

News.defaultProps = {
  pageSize: 8,
  country: 'us',
  category: 'general',
  author: 'author',
  date: 'unknown'
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string
}


