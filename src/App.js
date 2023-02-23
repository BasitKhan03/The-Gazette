import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  // const country = 'us';
  const pageSize = 8;
  const apiKey = process.env.REACT_APP_NEW_API_2
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress} />
            <Navbar />

          {/* NewsApi */}
          {/* <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country={country} category='general' badgeColor='warning' />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} country={country} category='business' badgeColor='success' />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country={country} category='entertainment' badgeColor='danger' />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} country={country} category='health' badgeColor='info' />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} country={country} category='science' badgeColor='primary' />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country={country} category='sports' badgeColor='light' />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} country={country} category='technology' badgeColor='dark' />} />
          </Routes> */}

        {/* NY Times Api */}
         <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} category='world' badgeColor='warning' />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} category='business' badgeColor='success' />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} category='movies' badgeColor='danger' />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} category='health' badgeColor='info' />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} category='science' badgeColor='primary' />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} category='sports' badgeColor='light' />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} category='technology' badgeColor='dark' />} />
          </Routes>
        </Router>
    </>
  )
}
