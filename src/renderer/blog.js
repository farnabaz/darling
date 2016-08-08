'use strict';
import Hexo from 'hexo';
import fs from 'fs';
import Path from 'path'


class Blog {

  constructor() {

  }

  /**
   * blog title
   * @return {String|null} return blog title if loaded, null otherwise
   */
  getTitle() {
    if (this.isLoaded()) {
      return this.hexo.config.title
    } else {
      return null;
    }
  }
  /**
   * is blog already loaded
   * @return {Boolean}
   */
  isLoaded() {
    return !!this.hexo;
  }
  /**
   * load blog
   * @param  {String} root          blog root path
   * @param  {Object} params        Hexo initialize params
   * @param  {function} readyCallback callback called when blog were ready
   */
  load(root, params, callback) {
    this.readPathInfo(root, (err, info) => {
      if (err) {
        callback(err);
      }
      this.hexo = new Hexo(root, params);
      this.hexo.init().then(() => {
        this.hexo.load().then(() => {
          callback(null);
        })
        .error((err) => {
          callback(err)
        })
      })
      .error((err) => {
        callback(err)
      })
    })
  }

  getPosts() {
    if (this.isLoaded()) {
      var Post = this.hexo.model('Post');
      return Post.sort({published: -1, date: -1})
        .toArray();
    } else {
      return null;
    }
  }

  /**
   * read package.json file and detect blog information if exists
   * @param  {String}   path     blog path
   * @param  {Function} callback callback function
   */
  readPathInfo(path, callback) {
    fs.readFile(Path.join(path, 'package.json'), {
      encoding: 'UTF-8'
    }, (err, data, x) => {
      if (err) {
        callback(err, null);
      }
      try {
        var data = JSON.parse(data)
        if (data.hexo) {
          callback(null, data);
        } else {
          callback('Blog not found', null);
        }
      } catch (e) {
        callback(e, null);
      }
    })
  }

}

export default Blog;
