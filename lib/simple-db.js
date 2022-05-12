const { writeFile, readFile, readdir } = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

class SimpleDb {

  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  async save(obj) {
    
    obj.id = nanoid();

    const objPath = path.join(this.dirPath, `${obj.id}.json`);

    return await writeFile(objPath, JSON.stringify(obj));
  }

  async get(id) {
    return await this.readThisFile(`${id}.json`);
  }

  async readThisFile(fileName) {
    const filePath = path.join(this.dirPath, fileName);
    try {
      const file = await readFile(filePath, 'utf8');
      return JSON.parse(file)
    } catch (e) {
          if(e.code == 'ENOENT') return null;
          throw e;
    }
  }
  
  async getAll() {
    const files = await readdir(this.dirPath);
    return await Promise.all(files.map(file => this.readThisFile(file)));
  }
}

module.exports = SimpleDb;
