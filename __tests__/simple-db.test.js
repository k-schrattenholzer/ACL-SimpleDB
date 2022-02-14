const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db.js');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  test('SimpleDb can save and get an object', () => {
    const obj = {
      abc: 123,
      bob: 'bobbert'
    };
    const expected = Object.assign({
      id: expect.any(String)
    }, obj);

    const simpleDb = new SimpleDb(TEST_DIR);
    return simpleDb.save(obj)
      .then(() => simpleDb.get(obj.id))
      .then(actual => expect(actual).toEqual(expected));
  });

  it ('gets all saved objects', () => {
    const newDB = new SimpleDb(TEST_DIR);

    const object1 = { 
      boogers: 'you should eat them', 
      ohSoManyBoogers: 'what a big truck!' 
    };

    const object2 = { 
      boogers: 'my turtle can be opinionated', 
      ohSoManyBoogers: 'he wanted very badly to survive' 
    };

    return newDB
      .save(object1)
      .then(() => newDB.save(object2))
      .then(() => newDB.getAll())
      .then(actual => expect(actual).toEqual(expect.arrayContaining([object1, object2])));

  });
});
