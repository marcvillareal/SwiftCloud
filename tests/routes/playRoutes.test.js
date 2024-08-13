const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app"); // Adjust path to your app
const Play = require("../../src/swift-api/models/plays");
const Song = require("../../src/swift-api/models/song");

// Connect to the test database before all tests run
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {});
});

// Clear the database before each test
beforeEach(async () => {
  await Song.deleteMany({});
  await Play.deleteMany({});

  // Create test songs
  const songA = await Song.create({
    title: "Song A",
    artist: "Artist A",
    album: "Album A",
    year: 2023,
  });

  const songB = await Song.create({
    title: "Song B",
    artist: "Artist B",
    album: "Album B",
    year: 2023,
  });

  // Insert test plays
  await Play.insertMany([
    { song: songA._id, month: "January", year: 2023, plays: 300 },
    { song: songB._id, month: "February", year: 2023, plays: 150 },
    { song: songA._id, month: "March", year: 2023, plays: 100 },
  ]);
});

// Close the database connection after all tests have run
afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /plays/song-of-the-year/:year", () => {
  it("should return the song of the year", async () => {
    const res = await request(app).get("/song-of-the-year/2023");
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe("Song A");
    expect(res.body.totalPlays).toBe(400); // Total plays for Song A
  });

  it("should return 404 if no data exists for the given year", async () => {
    const res = await request(app).get("/song-of-the-year/2024");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("No song data found for the given year");
  });

  it("should return 400 if the year is invalid", async () => {
    const res = await request(app).get("/song-of-the-year/invalidYear");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("Invalid year");
  });
});
