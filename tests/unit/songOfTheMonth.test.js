const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const Play = require("../../src/swift-api/models/plays");
const Song = require("../../src/swift-api/models/song");

// Connect to the test database before all tests run
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    // Check if not already connected
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// Clear the database before each test
beforeEach(async () => {
  await Song.deleteMany({});
  await Play.deleteMany({});
});

// Close the database connection after all tests have run
afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /song-of-the-month/:year/:month", () => {
  it("should return the song of the month", async () => {
    const song = new Song({
      title: "Hit Song",
      artist: "Artist Name",
      album: "Album Name",
      year: 2024,
    });
    await song.save();

    await Play.insertMany([
      {
        song: song._id,
        month: "August",
        year: 2024,
        plays: 100,
      },
      {
        song: song._id,
        month: "August",
        year: 2024,
        plays: 200,
      },
    ]);

    const res = await request(app).get("/song-of-the-month/2024/August");
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe("Hit Song");
    expect(res.body.totalPlays).toBe(300);
  });

  it("should return 404 if no data exists for the given month and year", async () => {
    const res = await request(app).get("/song-of-the-month/2024/September");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe(
      "No song data found for the given month and year"
    );
  });

  it("should return 400 if the year or month is invalid", async () => {
    const res = await request(app).get("/song-of-the-month/invalidYear/August");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("Invalid year or month");
  });
});
