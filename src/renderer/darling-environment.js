'use strict';

import electron, {remote, shell} from 'electron';
import ViewRegistery from './view-registery.js'
import ipcListener from './ipc-listener.js'
import Blog from './blog.js'
import Workspace from './workspace.js'

import ReactDOM from 'react-dom'


var UI = null;

class DarlingEnvironment {

  constructor() {
    this.appVersion = remote.app.getVersion();
    this.blog = new Blog()

    this.views = ViewRegistery

    this.workspace = Workspace
  }

  /**
   * Close the current window.
   */
  close() {
    remote.getCurrentWindow().close();
  }
  /**
   * Visually and audibly trigger a beep.
   */
  beep() {
    shell.beep();
  }
  /**
   * Reload the current window.
   */
  reload() {
    remote.getCurrentWindow().reload();
  }

}

window.darling = new DarlingEnvironment();

// initialize view
window.UI = ReactDOM.render( ViewRegistery.getView(darling.workspace) ,
  document.getElementById('app-container'))

export default darling
