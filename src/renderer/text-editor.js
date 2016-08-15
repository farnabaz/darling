import ViewRegistery from './view-registery.js'
import Model from './model.js'
import TextEditorView from './Components/text-editor-view.js'
import Post from './post.js'


class TextEditor extends Model {
  constructor(post) {
    super()
    if (!(post instanceof Post)) {
      this.post = new Post();
    } else {
      this.post = post;
    }
  }

  viewDidLoad() {
    if (this.post.content) {
      this.dispatch({
        name: 'content',
        content: this.post.content
      });
    }
  }

  getTitle() {
    return this.post.title || 'untitled';
  }

  getPath() {
    return this.post.path;
  }
  /**
   * post full path
   */
  getFullPath() {
    return this.post.full_path;
  }

  getText() {
    return ViewRegistery.getView(this).getContent()
  }

  isActive() {
    return darling.workspace.isActiveTextEditor(this);
  }

  /**
   * close editor
   */
  close() {
    darling.workspace.close(this);
  }

  save() {
    if (this.getFullPath()) {
      this.post.content = this.getText()
      this.post.save();
    } else {
      darling.workspace.needFileToSave((path) => {
        this.post.setPath(path);
        this.post.content = this.getText()
        this.post.save();
      })
    }
  }

}

ViewRegistery.addViewProvider(TextEditor, TextEditorView)

export default TextEditor
