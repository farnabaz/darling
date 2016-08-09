import ViewRegistery from './view-registery.js'
import WorkspaceView from './Components/workspace-view.js'
import Sidebar from './Components/sidebar.js'
import Model from './model.js'
import TextEditor from './text-editor.js'
const fs = require('fs')

class Internal {

  constructor() {
    this.editors = [];
  }

  open(workspace, path) {
    var isDirectory = fs.lstatSync(path).isDirectory()
    if (isDirectory) {
      workspace.dispatch('busy');
      darling.blog.load(path, () => {
        workspace.dispatch('free')
      })
    } else {
      var editor = new TextEditor(path);
      this.editors.push(editor);
      workspace.dispatch("update")
    }
  }
}

var _ = null;

class Workspace extends Model {

  constructor() {
    super()
    _ = new Internal();
  }

  getTextEditors() {
    return _.editors;
  }

  getLeftPanels() {
    return [
      Sidebar
    ]
  }


  open(path) {
    return _.open(this, path);
  }



  setBusy(busy) {
    this.dispatch( busy ? 'busy' : 'free')
  }
}

ViewRegistery.addViewProvider(Workspace, WorkspaceView)

export default new Workspace()
