import ViewRegistery from './view-registery.js'
import WorkspaceView from './Components/workspace-view.js'
import Sidebar from './Components/sidebar.js'
import Model from './model.js'
import TextEditor from './text-editor.js'
import Post from './post.js'
import {remote} from 'electron'
const Dialog = remote.dialog

const fs = require('fs')

class Internal {

  constructor() {
    this.editors = [];
  }

  findTextEditorForPath(path) {
    for (var i in this.editors) {
      if (this.editors[i].getFullPath()
          && this.editors[i].getFullPath() == path) {
        return this.editors[i];
      }
    }
    return null;
  }


  openPost(post) {
    var editor = this.findTextEditorForPath(post.full_path);
    if (editor) {
      darling.workspace.switch(editor);
    } else {
      this.pushEditor(new TextEditor(post))
    }
  }
  openPath(path) {
    var editor = this.findTextEditorForPath(path);
    if (editor) {
      darling.workspace.switch(editor);
    } else {
      var isDirectory = fs.lstatSync(path).isDirectory()
      if (isDirectory) {
        darling.workspace.dispatch('blog-will-load');
        darling.blog.load(path, () => {
          darling.workspace.dispatch('blog-did-load')
        })
        return;
      } else {
        darling.blog.loadPost(path, (err, post) => {
          if (!err) {
            this.pushEditor(new TextEditor(post))
          }
        })
      }
    }
  }
  open(workspace, path) {
    if (path == null) {
      return this.pushEditor(new TextEditor())
    }
    if (path instanceof Post) {
      this.openPost(path);
    } else if (typeof path === "string") {
      this.openPath(path);
    }

  }

  pushEditor(editor) {
    this.editors.push(editor);
    this.activeEditor = editor;
    darling.workspace.dispatch("update")
  }

  close(editor) {
    ViewRegistery.invalidate(editor);
    var index = this.editors.indexOf(editor);
    if (index != -1) {
      this.editors.splice(index, 1)
      // select previous TextEditor
      if (this.editors.length > 0) {
        if (index > 0) {
          index -= 1;
        }
        this.activeEditor = this.editors[index]
      }
      darling.workspace.dispatch("update")
    }
  }




  needFileToSave(callback) {
    Dialog.showSaveDialog({
      properties: ['openFile', 'openDirectory'],
      filters: [
        {
          name: 'markdown',
          extensions: ['md']
        }
      ]
    }, function(fileName) {
      if (fileName === void 0) {
        return;
      }
      callback(fileName)
    });
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

  getActiveTextEditor() {
    return _.activeEditor;
  }

  isActiveTextEditor(editor) {
    return this.getActiveTextEditor().getID()
      == editor.getID();
  }

  getLeftPanels() {
    return [
      Sidebar
    ]
  }


  open(path) {
    return _.open(this, path);
  }

  close(editor) {
    _.close(editor)
  }

  switch(editor) {
    _.activeEditor = editor;
    this.dispatch('update')
  }



  setBusy(busy) {
    this.dispatch( busy ? 'busy' : 'free')
  }


  needFileToSave(callback) {
    _.needFileToSave(callback);
  }
}

ViewRegistery.addViewProvider(Workspace, WorkspaceView)

export default new Workspace()
