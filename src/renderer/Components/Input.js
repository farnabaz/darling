'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Input extends Component {

  static get defaultProps() {
    return {
      type: "text"
    }
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (this.props.onSubmit) {
        this.props.onSubmit(e.target.value);
      }
    }
  }

  render() {
      return (
        <input autoFocus type={this.props.type} onKeyPress={this._handleKeyPress.bind(this)}/>
      );
  }
}

export default Input
