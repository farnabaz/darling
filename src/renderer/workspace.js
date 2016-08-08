import ViewRegistery from './view-registery.js'
import WorkspaceView from './Components/workspace-view.js'
import Sidebar from './Components/sidebar.js'
import Model from './model.js'
import TextEditor from './text-editor.js'


class Workspace extends Model {

  constructor() {
    super()
  }

  getTextEditors() {
    return [
      new TextEditor()
    ];
  }

  getLeftPanels() {
    return [
      Sidebar
    ]
  }


}

ViewRegistery.addViewProvider(Workspace, WorkspaceView)

export default new Workspace()
