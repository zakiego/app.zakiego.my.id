import dotenv from "dotenv";
import { createMocks } from "node-mocks-http";

import PublicTwitter from "../../../../pages/api/twitter/v1/public";

dotenv.config({ path: ".env.local" });

describe("/api/twitter/v1/public", () => {
  test("return status true and username same", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        username: "prasastipagi",
      },
    });

    await PublicTwitter(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toMatchObject({
      error: false,
    });
  });

  test("returns a data with the specified type", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        username: "prasastipagi",
      },
    });

    await PublicTwitter(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        data: {
          id: expect.any(String),
          username: expect.any(String),
          name: expect.any(String),
          tweet: expect.any(Number),
          followers: expect.any(Number),
          following: expect.any(Number),
          timestamp: expect.any(String),
        },
      }),
    );
  });
});
