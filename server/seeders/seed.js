const db = require('../config/connection');
const { User, Thread } = require('../models');
const userSeeds = require('./userSeeds.json');
const threadSeeds = require('./threadSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Thread', 'threads');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < threadSeeds.length; i++) {
      const { _id, threadAuthor } = await Thread.create(threadSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: threadAuthor },
        {
          $addToSet: {
            threads: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
