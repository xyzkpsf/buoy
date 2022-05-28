const request = require("supertest");
const app = require("./app");

const test51101_5 = [
  {
    time: "2022-05-04",
    height: "3.8",
  },
  {
    time: "2022-05-04",
    height: "3.8",
  },
  {
    time: "2022-05-04",
    height: "3.7",
  },
  {
    time: "2022-05-04",
    height: "3.7",
  },
  {
    time: "2022-05-04",
    height: "3.5",
  },
];

describe("Basic Test", () => {
  it("Should return 200", async () => {
    const res = await request(app)
      .get("/big-waves")
      .query({ sid: 51101, n: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(test51101_5);
  });

  it("Should return 404", async () => {
    const res = await request(app).get("/big-waves").query({ sid: 1, n: 5 });
    expect(res.statusCode).toBe(404);
  });

  it("Should return 500", async () => {
    const res = await request(app)
      .get("/big-waves")
      .query({ sid: 51101, n: 101 });
    expect(res.statusCode).toBe(500);
  });
});
