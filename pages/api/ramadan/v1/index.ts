import moment from "moment-hijri";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function CountRamadan(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    moment.locale("en");
    const now = moment();

    const isPassedRamadanThisYear = parseInt(now.format("iM")) > 9;
    const isRamadanNow = parseInt(now.format("iM")) == 9;
    const yearHijriNow = parseInt(now.format("iYYYY"));

    if (isRamadanNow) {
      const whenNextRamadan = moment(`${yearHijriNow}/9/1`, "iYYYY/iM/iD");
      const ramadanDay = parseInt(now.format("iD"));
      const ramadanProgress = ((ramadanDay / 30) * 100).toFixed(0) + "%";

      return res.status(200).json({
        error: false,
        data: {
          today: now.format("YYYY/M/D"),
          nextRamadan: whenNextRamadan.format("YYYY/M/D"),
          countdown: 0,
          isRamadanNow,
          ramadanDay,
          ramadanProgress,
        },
      });
    }

    if (!isPassedRamadanThisYear) {
      const whenNextRamadan = moment(`${yearHijriNow}/9/1`, "iYYYY/iM/iD");
      const countdown = whenNextRamadan.diff(now, "days") + 1;

      return res.status(200).json({
        error: false,
        data: {
          today: now.format("YYYY/M/D"),
          nextRamadan: whenNextRamadan.format("YYYY/M/D"),
          countdown,
          isRamadanNow,
          ramadanDay: 0,
          ramadanProgress: 0,
        },
      });
    }

    if (isPassedRamadanThisYear) {
      const whenNextRamadan = moment(`${yearHijriNow + 1}/9/1`, "iYYYY/iM/iD");
      const countdown = whenNextRamadan.diff(now, "days") + 1;

      return res.status(200).json({
        error: false,
        data: {
          today: now.format("YYYY/M/D"),
          nextRamadan: whenNextRamadan.format("YYYY/M/D"),
          countdown,
          isRamadanNow,
          ramadanDay: 0,
          ramadanProgress: 0,
        },
      });
    }
  } catch (err) {
    res.status(200).json({ error: true, data: {} });
  }
}
