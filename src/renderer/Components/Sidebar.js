'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    darling.workspace.register((name) => {
      switch (name) {
        case 'blog-did-load':
          this.forceUpdate();
          break;
        default:

      }
    })
  }

  render() {
    return (
      <div className="sidebar flex">
        <div className="panel-scroller">
        <ul className="flex-master list">
        {darling.blog.posts().map(function(post, i){
          return (
            <li key={i} onClick={() => {
              darling.workspace.open(post);
            }}>
              <span className="title">
                {post.title}
              </span>
            </li>
          )
        })}
        </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar
