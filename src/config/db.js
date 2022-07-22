const mongoose = require("mongoose");

async function db() {
  try {
    console.log("Connecting To mongoDb ...");
    await mongoose.connect("mongodb://localhost:27017/pfe_salah");
    console.log("Connection succeded...");
  } catch (error) {
    console.log(`Connection Error ******** \n ${error} `);
  }
}

module.exports = { db };
