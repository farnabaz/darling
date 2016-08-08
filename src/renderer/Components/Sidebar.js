'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Sidebar extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div className="sidebar">

      </div>
    );
  }
}

export default Sidebar
