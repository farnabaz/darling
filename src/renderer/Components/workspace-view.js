'use strict';

// ES6 Component
// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'

import Input from './Input.js'

const modalStyles = {
  overlay: {
    backgroundColor   : 'rgba(0, 0, 0, 0.2)'
  },
  content : {
    width                      : '550px',
    maxWidth                   : '90%',
    transform                  : 'translateX(-50%)',
    top                        : '0',
    left                       : '50%',
    right                      : 'auto',
    bottom                     : 'auto',
    border                     : 'none',
    background                 : '#282C34',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '0 0 5px 5px',
    outline                    : 'none',
    padding                    : '7px'
  }
};

class WorkspaceView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  createPost() {
    this.setState({
      showModal: true
    })
  }

  handleModalOpen() {
    ReactDOM.findDOMNode(this.refs.createPostName).focus();
  }

  /**
   * hide modal
   */
  closeModal() {
    this.setState({
      showModal: false
    })
  }

  modalAction(action, value) {
    switch (action) {
      case 'new-post':
        HexoWrapper.create('post', value)
          .error(function(err) {
            console.error(err, err.stack)
          })
          .then(function (file) {
            // TODO:
          });;
        this.closeModal()
        break;
      default:

    }

  }

  render() {
    return (
      <div className="container">
        <div className="main">
          {darling.workspace.getLeftPanels()
            .map((panel, key) => {
              return darling.views.getView(panel, {
                key: key
              })
          })}
          <div className="editors-pane">
            {darling.workspace.getTextEditors()
              .map((editor, key) => {
              return darling.views.getView(editor, {
                key: key
              })
            })}
          </div>
        </div>
        <div className="footer">
        </div>
        <Modal isOpen={this.state.showModal}
          style={modalStyles}
          onAfterOpen={this.handleModalOpen.bind(this)}
          onRequestClose={this.closeModal.bind(this)}>
          <label>Enter name for new post</label>
          <Input ref="createPostName" onSubmit={this.modalAction.bind(this, 'new-post')}/>
        </Modal>
      </div>
    );
  }
}

// Render to ID content in the DOM
export default WorkspaceView
