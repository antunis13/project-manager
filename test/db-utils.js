const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let memoryServer;

const setupDb = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  memoryServer = await MongoMemoryServer.create();
  const uri = memoryServer.getUri();

  await mongoose.connect(uri, {
    dbName: "tests",
  });
};

const clearDb = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

const tearDownDb = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

module.exports = {
  setupDb,
  clearDb,
  tearDownDb,
};
