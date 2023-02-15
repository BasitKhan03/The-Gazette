import React, { Component } from 'react'
import './NewsItem.css'

export default class NewsItem extends Component {
  render() {
    let { title, source, description, imageUrl, author, date, newsUrl, badgeColor } = this.props;
    return (
      <>
        <div className="my-3 d-flex justify-content-center">
          <div className="card" style={{ width: "18rem" }}>
            <span className={`position-absolute top-0 start-50 translate-middle badge rounded-pill text-bg-${badgeColor}`} style={{zIndex: '1'}}>
              {source}
            </span>
            <img src={!imageUrl ? "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/HNW_illustrations_v3-29.max-1000x1000.png" : imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5> 
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {author?author:"Anonymous"} on {new Date(date).toDateString()}</small></p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary readBtn">Read More</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}
