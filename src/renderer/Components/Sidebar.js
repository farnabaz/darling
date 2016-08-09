'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div className="sidebar flex">
        <ul className="flex-master">
        {this.state.posts.map(function(post, i){
          return (
            <li key={i}>
              <span className="title">
                {post.title}
              </span>
            </li>
          )
        })}
        </ul>
      </div>
    );
  }
}

export default Sidebar
