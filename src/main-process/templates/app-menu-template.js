const electron = require('electron')
const dialog = electron.dialog;
const fs = require('fs')

var template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Post',
        accelerator: 'CmdOrCtrl+N',
        click: function(item, focusedWindow) {
          return focusedWindow.webContents.send("new-post");
        }
      }, {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click: function(item, focusedWindow) {
          return dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory'],
            filters: [
              {
                name: 'text',
                extensions: ['txt']
              }, {
                name: 'markdown',
                extensions: ['md', 'MD']
              }
            ]
          }, function(fileNames) {
            var fileName;
            if (fileNames === void 0) {
              return;
            }
            fileName = fileNames[0];
            return focusedWindow.webContents.send("open",fileName);
          });
        }
      }, {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function(item, focusedWindow) {
          return focusedWindow.webContents.send("save-file");
        }
      }, {
        type: 'separator'
      }, {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  }, {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]
  }, {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F';
          } else {
            return 'F11';
          }
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            return focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: (function() {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I';
          } else {
            return 'Ctrl+Shift+I';
          }
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            return focusedWindow.toggleDevTools();
          }
        }
      }
    ]
  }, {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      }
    ]
  }, {
    label: 'Help',
    role: 'help',
  }
];
if (process.platform === 'darwin') {
  template.unshift({
    label: electron.app.getName(),
    submenu: [
      {
        label: 'About ' + electron.app.getName(),
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Preferences...',
        accelerator: 'Command+,',
        click: function() {}
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        role: 'services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: "Hide " + electron.app.getName(),
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        selector: 'terminate:'
      }
    ]
  });
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  });
}

module.exports = template
