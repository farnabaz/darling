'use strict';

import Hexo from 'hexo';


var HexoWrapper = {
  hexo: null,

  init: function(root, params, ready) {
    var self = this;
    this.hexo = new Hexo(root, params);
    this.hexo.init().then(function(){
      self.hexo.load().then(function(e,f,g){
        if (ready) {
          ready();
        }
      });
    });
  },

  create: function (layout, title) {
    var self = this;
    return this.hexo.post.create({title: title, layout: layout, date: new Date()});
  }

};
export default HexoWrapper;
