import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Error')
        }
        return response.json()
      })
      .then(posts => {
        this.setState({
          posts: posts.data.children
        })
      })
  }

  render() {
    console.log('State', this.state)
    var posts = this.state.posts
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {posts.map(post => {
          return (
            <p key={post.data.id}>{post.data.title}</p>
          )
        })}
      </div>
    );
  }
}

export default App;
