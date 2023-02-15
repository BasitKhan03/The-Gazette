import React, { Component } from 'react'
import './News.css'
import PropTypes from 'prop-types'
import NewsItem from '../NewsItem/NewsItem'
import Spinner from '../Spinner/Spinner'
import InfiniteScroll from "react-infinite-scroll-component"

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }

    document.title = `${this.capitalizeFirstLetter(this.props.category)} - The Gazette`
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  static defaultProps = {
    pageSize: 8,
    country: 'us',
    category: 'general',
    author: 'author',
    date: 'unknown'
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string
  }

  updateNewsPage = async () => {
    this.props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })

    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNewsPage();
  }

  fetchMoreData = async () => {
    await this.setState({ page: this.state.page + 1 })

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  }

  // handlePrevClick = async () => {
  //   await this.setState({ page: this.state.page - 1 })
  //   this.updateNewsPage();

  //   // this.setState({ page: this.state.page - 1 }, ()=> this.updateNewsPage())
  // }

  // handleNextClick = async () => {
  //   await this.setState({ page: this.state.page + 1 })
  //   this.updateNewsPage();

  //   // this.setState({ page: this.state.page + 1 }, ()=> this.updateNewsPage());
  // }

  render() {
    return (
      <>
        <div className='container my-5'>
          <div>
            <h3 className='mb-4 mainHeading'>{this.props.category === 'general' ? 'The Gazette - Top News Headlines' : `The Gazette - Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}</h3>
          </div>

          {this.state.loading && <Spinner />}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />}>

            <div className="container">
              <div className='row'>
                {this.state.articles.map((element) => {
                  return <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={element.url}>
                    <NewsItem title={element.title} description={element.description ? element.description.slice(0, 70) : element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} badgeColor={this.props.badgeColor} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>

          {/* {!this.state.loading && <hr className='mx-3' />}
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-light pageBtn" onClick={this.handlePrevClick}>&laquo; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-light pageBtn mr-4" onClick={this.handleNextClick}>Next &raquo;</button>
          </div> */}
        </div>
      </>
    )
  }
}
