import React from 'react'
import './NewsItem.css'

export default function NewsItem(props) {
  let { title, source, description, imageUrl, author, date, newsUrl, badgeColor } = props;

  const titleCase = (string) => {
    let lowercase = string.toLowerCase();
    let words = lowercase.split(' ');

    let temp = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return temp.join(' ');
  }

  const articleDate = new Date(date);
  
  let dayOfWeek = articleDate.getDay();
  let day = articleDate.getDate();
  let month = articleDate.getMonth();
  let year = articleDate.getFullYear();
  
  let weekArray = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  let dayName = weekArray[dayOfWeek];
  let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let monthName = monthArray[month];

  let formatedDate = `${dayName}, ${monthName} ${day}, ${year}`;

  return (
    <>
      <div className="my-3 d-flex justify-content-center">
          <div className="card" style={{ width: "18rem" }}>
            <span className={`position-absolute top-0 start-50 translate-middle badge rounded-pill text-bg-${badgeColor}`} style={{zIndex: '1'}}>
              {source}
            </span>
            <img src={!imageUrl ? "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/HNW_illustrations_v3-29.max-1000x1000.png" : imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title ? title : 'Open to Read...'}</h5> 
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">{author ? titleCase(author) : 'By Anonymous'} on {formatedDate}</small></p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary readBtn">Read More</a>
            </div>
          </div>
        </div>
    </>
  )
}
