import HFM from 'hexo-front-matter'
import Path from 'path'
import fs from 'fs'


class Post {

  constructor(path, content) {
    this.meta = {};
    if (path) {
      var pathInfo = Path.parse(path);
      this.meta = HFM.parse(content);

      this.title = this.meta.title;
      this.date = this.meta.date;
      this.path = pathInfo.base;
      this.full_path = path;
      this.content = this.meta._content;
      delete this.meta._content;
    }
  }

  setPath(path) {
    var pathInfo = Path.parse(path);
    this.path = pathInfo.base;
    this.full_path = path;
  }

  save() {
    var content = HFM.stringify(this.meta, {
      prefixSeparator: true
    });
    console.log(content);
    content += "\n" + this.content;
    fs.writeFile(this.full_path, content, (err) => {
      console.log(err);
    })
  }

}

export default Post;
