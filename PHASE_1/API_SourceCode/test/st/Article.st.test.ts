import request from "supertest";
import { IHttpError } from "../../src/interfaces/IApiResponses";
import Server from "../../src/Server";
import { waitAsync, setTestSecrets, clearDb } from "../utils/testHelper";

const serverUrl = "http://localhost:4993";

describe("ArticleService", () => {
  let server: Server;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    setTestSecrets();
    server = new Server();
    await server.start();
    await waitAsync(4000);
  }, 15000);

  afterEach(async () => {
    await waitAsync(2000);
    // await clearDb(); DANGEROUS don't do on prod database
    await server.stop();
  }, 15000);

  describe("GET /articles/:articleId", () => {
    it("should return 404 when no article exists with id given", async () => {
      const articleId = "69deb19f-6d04-4e61-82af-7841241c93f4";
      await request(serverUrl)
        .get(`/api/v1/articles/${articleId}`)
        .expect(404, {
          errorCode: 404,
          errorMessage: "Resource not found",
        } as IHttpError);
    }, 25000);

    it("should return 500 when articleId is not valid", async () => {
      const articleId = "notvalid";
      await request(serverUrl)
        .get(`/api/v1/articles/${articleId}`)
        .expect(500, {
          errorCode: 500,
          errorMessage: "An internal server error occurred",
        } as IHttpError);
    }, 25000);

    it("should return 200 when articleId is valid and exists", async () => {
      const articleId = "notvalid";
      await request(serverUrl)
        .get(`/api/v1/articles/${articleId}`)
        .expect(200, {
          errorCode: 200,
          errorMessage: "An internal server error occurred",
        } as IHttpError);
    }, 25000);
  });
});
