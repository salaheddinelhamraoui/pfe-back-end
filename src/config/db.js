const mongoose = require('mongoose');

async function db() {
  try {
    console.log('Connecting To mongoDb ...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connection succeded...');
  } catch (error) {
    console.log(`Connection Error ******** \n ${error} `);
  }
}

module.exports = { db };
