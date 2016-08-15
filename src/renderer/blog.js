import YAML from 'yamljs';
import Path from 'path';
import fs from 'fs';
import Post from './post.js'


class Blog {
  constructor() {
    this.isValidHexoPath = false;

    this.config = {}
    this.content = {
      posts: []
    }
    this._ = {
      loaded: false
    }
  }

  /**
   * blog title
   * @return {String|null} return blog title if loaded, null otherwise
   */
  getTitle() {
    if (this.isLoaded()) {
      return this.config.title
    } else {
      return null;
    }
  }
  /**
   * is blog already loaded
   * @return {Boolean}
   */
  isLoaded() {
    return !!this._.loaded;
  }

  isValidBlog() {
    return this.isValidHexoPath;
  }

  posts() {
    return this.content.posts;
  }




  /**
   * load blog
   * @param  {String} root          blog root path
   * @param  {Object} params        Hexo initialize params
   * @param  {function} readyCallback callback called when blog were ready
   */
  load(root, callback) {
    this.readPathInfo(root, (err, info) => {
      if (err) {
        callback && callback(err);
      }
      this.path = root;
      this.configPath = Path.join(this.path, '_config.yml')
      this.isValidHexoPath = true;

      YAML.load(this.configPath, (result) => {
        this.config = result;
        if (!this.config.source_dir) {
          this.config.source_dir = "source";
        }
        this.loadPosts(callback)
      });
    })
  }

  loadPosts(callback) {
    var folder = Path.join(this.path, this.config.source_dir, '_posts')
    fs.readdir(folder, (err, files) => {
      if (err) {
        return callback(err);
      }
      var total = files.length,
          loaded= 0;

      for (var i in files) {
        var path = Path.join(folder, files[i]);
        if (files[i].match(/.*\.md$/)) {
          this.loadPost(path, (err, post) => {
            loaded +=1
            if (err) {

            };
            this.content.posts.push(post)
            if (loaded == total) {
              callback(null);
            }
          });
        } else {
          loaded += 1;
        }
      }
    })
  }

  loadPost(path, callback) {
    fs.readFile(path, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, new Post(path, data))
    });
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
