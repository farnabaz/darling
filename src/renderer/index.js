'use strict';

import './style/index.less';

// ES6 Component
// Import React and ReactDOM
import React from 'react';
import electron, {remote, ipcRenderer} from 'electron';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'

import Sidebar from './Components/Sidebar.js'
import Editor from './Components/Editor.js'
import Input from './Components/Input.js'
import HexoWrapper from './lib/HexoWrapper.js'

ipcRenderer.on('new-post', function(){
  window.app.createPost()
})
ipcRenderer.on('open', function(sender, isDirectory, path){
  console.log(isDirectory, path);
  if (isDirectory) {
    HexoWrapper.init(path, {}, function(){
      console.log('done');
    })
  }
})

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

class Darling extends React.Component {

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
          <Sidebar/>
          <Editor/>
        </div>
        <div className="footer">
          <a onClick={this.createPost.bind(this)}>d</a>
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
window.app = ReactDOM.render( < Darling / > ,
  document.getElementById('content')
);
