import React, { Component } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 8;
  country = 'us';
  apiKey = process.env.REACT_APP_NEW_API

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <>
        <Router>
          <LoadingBar
            color='#f11946'
            height={4}
            progress={this.state.progress} />
            <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} country={this.country} category='general' badgeColor='warning' />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={this.pageSize} country={this.country} category='business' badgeColor='success' />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} country={this.country} category='entertainment' badgeColor='danger' />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={this.pageSize} country={this.country} category='health' badgeColor='info' />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageSize} country={this.country} category='science' badgeColor='primary' />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country={this.country} category='sports' badgeColor='light' />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country={this.country} category='technology' badgeColor='dark' />} />
          </Routes>
        </Router>
      </>
    )
  }
}
