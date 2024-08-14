const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const Song = require("../../src/swift-api/models/song");
const songService = require("../../src/swift-api/services/songService");

// Filter Songs Test

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

describe("GET /filter/songs", () => {
  it("should return songs that match the title filter", async () => {
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
        title: "Blank Space",
        artist: "Taylor Swift",
        album: "1989",
        year: 2014,
      },
    ]);

    const filters = { title: "Love Story" };
    const songs = await songService.filterSongs(filters);
    expect(songs).toHaveLength(2); // Based on inserted data
    expect(songs[0].title).toBe("Love Story");
  });

  it("should return songs that match the album filter", async () => {
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
        title: "Blank Space",
        artist: "Taylor Swift",
        album: "1989",
        year: 2014,
      },
    ]);

    const filters = { album: "Fearless" };
    const songs = await songService.filterSongs(filters);
    expect(songs).toHaveLength(2); // Based on inserted data
    expect(songs[0].album).toBe("Fearless");
  });
});
