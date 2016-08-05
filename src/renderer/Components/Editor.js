'use strict';

// ES6 Component
// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

class Editor extends React.Component {

  constructor(props) {
    super(props);
  }

  renderPlaceholder() {
    return (
      <div className="placeholder text-center">
        <h1>
          ...
        </h1>
      </div>
    )
  }
  renderEditor() {

  }

  render() {
    return (
      <div className="editor">
        {this.props.data ? this.renderEditor() : this.renderPlaceholder()}
      </div>
    );
  }
}

export default Editor;
