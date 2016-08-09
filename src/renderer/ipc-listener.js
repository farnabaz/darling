import {ipcRenderer} from 'electron'


ipcRenderer.on('open', function(sender, path){
  darling.workspace.open(path)
})
