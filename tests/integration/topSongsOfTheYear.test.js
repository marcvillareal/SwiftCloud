const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    // Check if not already connected
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});


afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /top-5-songs-of-the-year/:year", () => {
  it("should return the top 5 songs of the year", async () => {
    const res = await request(app).get("/top-5-songs-of-the-year/2023");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeLessThanOrEqual(5);
    res.body.forEach((song) => {
      expect(song).toHaveProperty("title");
      expect(song).toHaveProperty("artist");
      expect(song).toHaveProperty("totalPlays");
    });
  });

  it("should return 404 for an invalid year", async () => {
    const res = await request(app).get("/top-5-songs-of-the-year/invalidYear");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("Invalid year");
  });
});
