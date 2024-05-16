import React, { useState, useEffect } from "react";
import "./News.css";
import PropTypes from "prop-types";
import NewsItem from "../NewsItem/NewsItem";
import Spinner from "../Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [initialLoad, setInitialLoad] = useState(false);
  const [error, setError] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  /// --| NY Times Api |-- ///

  const updateNewsPage = async () => {
    try {
      props.setProgress(10);

      const url = `https://api.nytimes.com/svc/news/v3/content/all/${props.category}.json?limit=${props.pageSize}&offset=${page}&api-key=${props.apiKey}`;

      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);

      let parsedData = await data.json();
      props.setProgress(70);

      if (parsedData.fault) {
        setInitialLoad(false);
        setLoading(false);
        setError(true);
        return;
      }

      if (parsedData.results) {
        setArticles(parsedData.results);
        setLoading(false);
        setInitialLoad(true);
        setError(false);
      }

      props.setProgress(100);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - The Gazette`;
    updateNewsPage();
    //eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    try {
      const url = `https://api.nytimes.com/svc/news/v3/content/all/${
        props.category
      }.json?limit=${props.pageSize}&offset=${
        window.screen.width <= 400 ? page + 4 : page + 8
      }&api-key=${props.apiKey}`;

      window.screen.width <= 400 ? setPage(page + 4) : setPage(page + 8);

      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.fault) {
        setInitialLoad(false);
        setTimeout(() => setInitialLoad(true), 60000);
        return;
      }

      if (parsedData.results) {
        setArticles(articles.concat(parsedData.results));
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="px-4 px-md-0">
          <h3 className={`${error ? "mb-3" : "mb-4"} mainHeading`}>
            {props.category === "world" && "The Gazette - Top News Headlines"}
            {props.category === "movies" &&
              "The Gazette - Top Entertainment Headlines"}
            {props.category !== "world" &&
              props.category !== "movies" &&
              `The Gazette - Top ${capitalizeFirstLetter(
                props.category
              )} Headlines`}
          </h3>
        </div>

        {error && (
          <div className="d-flex col-12 justify-content-center align-items-center">
            <div className="col-md-3 img-container">
              <img
                src={require("../../assets/error-504.jpg")}
                alt="img"
                className="img-fluid"
              />
            </div>
          </div>
        )}

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={initialLoad ? articles.length : null}
          next={fetchMoreData}
          hasMore={initialLoad}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 col-12"
                    key={element.url}
                  >
                    <NewsItem
                      title={element.title}
                      description={
                        element.abstract
                          ? element.abstract.slice(0, 70)
                          : element.abstract
                      }
                      imageUrl={
                        element.multimedia && element.multimedia.length > 0
                          ? element.multimedia.find(
                              (img) => img.format === "mediumThreeByTwo440"
                            )?.url
                          : null
                      }
                      newsUrl={element.url}
                      author={element.byline}
                      date={element.published_date}
                      source={
                        element.des_facet !== null &&
                        element.subsection !== null
                          ? element.des_facet !== null
                            ? element.des_facet[0]
                            : element.subsection
                          : element.source
                      }
                      badgeColor={props.badgeColor}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

News.defaultProps = {
  pageSize: 8,
  category: "world",
  author: "Anonymous",
  date: "Unknown",
  source: "New York Times",
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  source: PropTypes.string,
};

// export default function News(props) {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [initialLoad, setInitialLoad] = useState(false);

//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   /// --| NewsApi |-- ///

//   const updateNewsPage = async () => {
//     props.setProgress(10);

//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

//     setLoading(true);
//     let data = await fetch(url);
//     props.setProgress(30);

//     let parsedData = await data.json();
//     props.setProgress(70);

//     setArticles(parsedData.articles);
//     setTotalResults(parsedData.totalResults);
//     setLoading(false);

//     props.setProgress(100);
//   }

//   useEffect(() => {
//     document.title = `${capitalizeFirstLetter(props.category)} - The Gazette`;
//     updateNewsPage();
//     //eslint-disable-next-line
//   }, []);

//   const fetchMoreData = async () => {
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

//     setPage(page + 1);
//     let data = await fetch(url);
//     let parsedData = await data.json();

//     setArticles(articles.concat(parsedData.articles));
//     setTotalResults(parsedData.totalResults);
//   }

//   const handlePrevClick = async () => {
//     setPage(page - 1);
//     updateNewsPage();

//     // this.setState({ page: this.state.page - 1 }, ()=> this.updateNewsPage())
//   }

//   const handleNextClick = async () => {
//     setPage(page + 1);
//     updateNewsPage();

//     // this.setState({ page: this.state.page + 1 }, ()=> this.updateNewsPage());
//   }

//   return (
//     <>
//       <div className="container my-5">
//         <div>
//           <h3 className='mb-4 mainHeading'>{props.category === 'general' ? 'The Gazette - Top News Headlines' : `The Gazette - Top ${capitalizeFirstLetter(props.category)} Headlines`}</h3>
//         </div>

//         {loading && <Spinner />}

//         {articles.length > 0 && (
//           <InfiniteScroll
//             dataLength={articles.length}
//             next={fetchMoreData}
//             hasMore={initialLoad}
//             loader={<Spinner />}
//           >
//             <div className="container">
//             <div className='row'>
//               {articles.map((element) => {
//                 return <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={element.url}>
//                   <NewsItem title={element.title} description={element.description ? element.description.slice(0, 70) : element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} badgeColor={props.badgeColor} />
//                 </div>
//               })}
//             </div>
//           </div>
//           </InfiniteScroll>
//         )}

//         {!loading && <hr className='mx-3' />}
//           <div className="container d-flex justify-content-between">
//             <button disabled={page <= 1} type="button" className="btn btn-light pageBtn" onClick={handlePrevClick}>&laquo; Previous</button>
//             <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-light pageBtn mr-4" onClick={handleNextClick}>Next &raquo;</button>
//           </div>
//       </div>
//     </>
//   );
// }

// News.defaultProps = {
//   pageSize: 8,
//   country: 'us',
//   category: 'general',
//   author: 'Anonymous',
//   date: 'Unknown',
//   source: 'Unknown'
// }

// News.propTypes = {
//   pageSize: PropTypes.number,
//   country: PropTypes.string,
//   category: PropTypes.string,
//   author: PropTypes.string,
//   date: PropTypes.string,
//   source: PropTypes.string
// }
