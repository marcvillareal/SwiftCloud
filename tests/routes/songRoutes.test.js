const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const Song = require("../../src/swift-api/models/song");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /search/songs", () => {
  beforeEach(async () => {
    await Song.deleteMany({});
  });

  it("should return songs that match the search query", async () => {
    const song = new Song({
      title: "Love Story",
      artist: "Taylor Swift",
      album: "Fearless",
      year: 2008,
    });
    await song.save();

    const res = await request(app).get("/search/songs?q=Love");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe("Love Story");
  });
});
