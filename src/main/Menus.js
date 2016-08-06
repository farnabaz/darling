const electron = require('electron')
const Menu = electron.Menu;

module.exports = {

  /**
   * generate and update application main menu
   */
  updateMainMenu: function() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(require('./templates/app-menu-template.js')));
  }
};
