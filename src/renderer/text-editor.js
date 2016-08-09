import ViewRegistery from './view-registery.js'
import Model from './model.js'
import TextEditorView from './Components/text-editor-view.js'


class TextEditor extends Model {
  constructor(path, data) {
    super()
    this._data = {
      path: path,
      post: data
    };

  }

  getPath() {
    return this._data.path;
  }

  getText() {
    // TODO:
  }
}

ViewRegistery.addViewProvider(TextEditor, TextEditorView)

export default TextEditor
