import { createMocks } from "node-mocks-http";

import CountDownRamadan from "../../../../pages/api/ramadan/v1/countdown";

describe("/api/ramadan/v1/countdown", () => {
  test("return status true and utc 8", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        utc: "8",
      },
    });

    await CountDownRamadan(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toMatchObject({
      error: false,
      data: { utc: 8 },
    });
  });

  test("returns a data with the specified type", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await CountDownRamadan(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        data: {
          utc: expect.any(Number),
          today: expect.any(String),
          nextRamadan: expect.any(String),
          countdown: expect.any(Number),
          isRamadanNow: expect.any(Boolean),
          ramadanDay: expect.any(Number),
          ramadanProgress: expect.any(String),
        },
      }),
    );
  });
});
