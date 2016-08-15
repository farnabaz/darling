import View from './view.js';
import ReactDOM from 'react-dom';
import React from 'react';


class TextEditorView extends View {

  static get defaultProps() {
    return {
      preview: true
    }
  }

  constructor(props) {
    super(props);
  }

  handleModelEvents(data) {
    switch (data.name) {
      case 'content':
      ReactDOM.findDOMNode(this.refs['te_' + this.props.id])
        .value = data.content;
        break;
      default:

    }
  }

  getContent() {
    return ReactDOM.findDOMNode(this.refs['te_' + this.props.id])
      .value
  }

  className() {
    if (this.props.active) {
      return "editor flex active";
    } else {
      return "editor flex deactive"
    }
  }

  renderPreview() {
    return (
      <div className="panel-container">

      </div>
    )
  }

  render() {
    return (
      <div ref={"v_" + this.props.id} className={this.className()}>
        <textarea ref={"te_" + this.props.id} className="flex">

        </textarea>
        {this.props.preview ? this.renderPreview.bind(this) : null}
      </div>
    );
  }
}

export default TextEditorView
