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
});
