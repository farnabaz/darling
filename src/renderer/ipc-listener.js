import {ipcRenderer, remote} from 'electron'


ipcRenderer.on('open', function(sender, path){
  darling.workspace.open(path)
})
ipcRenderer.on('save-tab', function(sender, path){
  var editor = darling.workspace.getActiveTextEditor();
  if (editor) {
    editor.save();
  }
})
ipcRenderer.on('close-tab', function(sender, path){
  var editor = darling.workspace.getActiveTextEditor();
  if (editor) {
    editor.close();
  }
})
