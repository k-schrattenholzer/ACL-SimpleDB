const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

class SimpleDb {

  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  save(object) {
    
    object.id = nanoid();

    const objectPath = path.join(this.dirPath, `${object.id}.json`);

    return fs.writeFile(objectPath, JSON.stringify(object));
  }

  get(id) {
    return this.readFile(`${id}.json`);
  }

  readFile(fileName) {
    const filePath = path.join(this.dirPath, fileName);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8')
        .then(file => resolve(JSON.parse(file)))
        .catch(e => {
          if(e.code == 'ENOENT') resolve(null);
          else reject(e);
        })
    })
  }

}

module.exports = SimpleDb;
