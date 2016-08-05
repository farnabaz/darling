'use strict';

import './style/index.less';

// ES6 Component
// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './Components/Sidebar.js'
import Editor from './Components/Editor.js'

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="main">
          <Sidebar/>
          <Editor/>
        </div>
        <div className="footer">
        </div>
      </div>
    );
  }
}

// Render to ID content in the DOM
ReactDOM.render( < App / > ,
  document.getElementById('content')
);
