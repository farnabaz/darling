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

  showModal(role) {
    this.setState({
      showModal: true,
      modalRole: role
    })
  }


  /**
   * hide modal
   */
  closeModal() {
    this.setState({
      showModal: false,
      modalRole: null
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

  handleModelEvents(name) {
    switch (name) {
      case 'new-post':
        this.showModal('new-post');
        break;
      case 'busy':
        this.showModal('loading');
        break;
      case 'free':
        this.closeModal();
        break;
      case 'update':
        this.forceUpdate()
        break;
      default:

    }
  }

  handleModalOpen() {
    switch (this.state.modalRole) {
      case 'new-post':
        ReactDOM.findDOMNode(this.refs.createPostName).focus();
        break;
      case 'loading':
        break;
      default:
    }
  }

  renderModalContent() {
    switch (this.state.modalRole) {
      case 'new-post':
        return (
          <div>
          <label>Enter name for new post</label>
          <Input ref="createPostName" onSubmit={this.modalAction.bind(this, 'new-post')}/>
          </div>
        )
      case 'loading':
        return (
          <div>
            Loading...
          </div>
        )
      default:
       return null;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="main">
          <div className="panel panel-left">
          {darling.workspace.getLeftPanels()
            .map((panel, key) => {
              return darling.views.getElement(panel, {
                key: key
              })
          })}
          </div>
          <div className="editors-pane">
            {darling.workspace.getTextEditors()
              .map((editor, key) => {
              return darling.views.getElement(editor, {
                key: key
              })
            })}
          </div>
        </div>
        <div className="footer">
        <a onClick={this.showModal.bind(this, 'new-post')}>
          dd
        </a>

        </div>
        <Modal isOpen={this.state.showModal}
          style={modalStyles}
          onAfterOpen={this.handleModalOpen.bind(this)}
          onRequestClose={this.closeModal.bind(this)}>
          {this.renderModalContent()}
        </Modal>
      </div>
    );
  }
}

// Render to ID content in the DOM
export default WorkspaceView
