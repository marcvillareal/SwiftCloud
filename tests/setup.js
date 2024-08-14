require('dotenv').config({ path: './config/.env' }); // Load real or test environment variables

const mongoose = require('mongoose');
const app = require('../../src/app');

// Connect to the database before all tests run
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) { // Check if not already connected
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
