'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import View from './view.js'

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

class WorkspaceView extends View {

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
      case 'blog-will-load':
        this.showModal('loading');
        break;
      case 'free':
      case 'blog-did-load':
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
      <div className="workspace">
        <div className="flex horizontal">
          <div className="panel-container">
          {darling.workspace.getLeftPanels()
            .map((panel, key) => {
              return darling.views.getElement(panel, {
                key: key
              })
          })}
          </div>
          <div className="flex vertical">
            <div className="editor-tabs">
            {darling.workspace.getTextEditors()
              .map((editor, key) => {
              return (
                <div key={editor.getID()} className={"tab " + (editor.isActive() ? 'active' : '')}
                  onClick={this.props.model.switch.bind(this.props.model, editor)}>
                  <span>{editor.getTitle()}</span>
                  <div className="close-icon"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      editor.close()
                    }}>
                  </div>
                </div>
              )
            })}
            </div>
            <div className="editor-container">
              {darling.workspace.getTextEditors()
                .map((editor, key) => {
                return darling.views.getElement(editor, {
                  key: editor.getID(),
                  active: editor.isActive()
                })
              })}
            </div>
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
