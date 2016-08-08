import React from 'react';
import ReactDOM from 'react-dom';


class TextEditorView extends React.Component {

  static get defaultProps() {
    return {
      preview: false
    }
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.state.id = this.props.id;

  }

  getContent() {
    return ReactDOM.findDOMNode(this.refs['te_' + this.state.id])
      .value
  }

  renderPreview() {
    return (
      <div className="flex-slave">

      </div>
    )
  }

  render() {
    return (
      <div ref={"v_" + this.state.id} className="editor flex">
        <textarea ref={"te_" + this.state.id} className="flex-master">

        </textarea>
        {this.props.preview ? this.renderPreview.bind(this) : null}
      </div>
    );
  }
}

export default TextEditorView
