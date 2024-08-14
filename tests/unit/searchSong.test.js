const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const Song = require("../../src/swift-api/models/song");

// Connect to the test database before all tests run
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST, {});
});

// Clear the database before each test
beforeEach(async () => {
  await Song.deleteMany({});
});

// Close the database connection after all tests have run
afterAll(async () => {
  await mongoose.connection.close();
});

// Search Songs Test

describe("GET /search/songs", () => {
  it("should return songs that match the search query", async () => {
    await Song.insertMany([
      {
        title: "Love Story",
        artist: "Taylor Swift",
        album: "Fearless",
        year: 2008,
      },
      {
        title: "Love Story",
        artist: "Taylor Swift",
        album: "Fearless",
        year: 2008,
      },
      {
        title: "Love Story",
        artist: "Taylor Swift",
        album: "Fearless",
        year: 2008,
      },
    ]);

    const res = await request(app).get("/search/songs?q=Love");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(3); // Based on inserted data
    expect(res.body[0].title).toBe("Love Story");
  });
});

