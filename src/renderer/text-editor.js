import ViewRegistery from './view-registery.js'
import Model from './model.js'
import TextEditorView from './Components/text-editor-view.js'


class TextEditor extends Model {
  constructor() {
    super()
  }

  getText() {
    // TODO:
  }
}

ViewRegistery.addViewProvider(TextEditor, TextEditorView)

export default TextEditor
