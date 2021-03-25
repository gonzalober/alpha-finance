import Express from "express";
import "regenerator-runtime/runtime";

describe("Test the root path", () => {
  const app = Express();

  beforeAll(async () => {
    app.connect();
  });

  afterAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.sequelize.close();
    await server.stop();
  });

  test("It should response the GET method", async () => {
    await request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

//"NODE_ENV=test jest --watchAll --testPathPattern=./tests --coverage --runInBand --detectOpenHandles --silent"
