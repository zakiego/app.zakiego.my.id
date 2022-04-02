import moment from "moment-hijri";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function CountDownRamadan(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    moment.locale("en");

    // create time by utc
    const utc = parseFloat(<string>req.query.utc) || 0;
    const dateUtc: string = moment().utcOffset(utc).format("YYYY/M/D HH:mm:ss");

    // conver dateUtc string to date
    const now = moment(dateUtc, "YYYY/M/D HH:mm:ss");

    // check if ramadan this year has passed or not
    // because if passed, the next ramadan is next year
    const isPassedRamadanThisYear = parseInt(now.format("iM")) > 9;

    // check is ramadan now
    const copyNowToSubtractDay = moment(now);
    const isRamadanNow =
      parseInt(copyNowToSubtractDay.subtract(1, "days").format("iM")) == 9;

    // check hijri year today
    const yearHijriNow = parseInt(now.format("iYYYY"));

    if (isRamadanNow) {
      const whenNextRamadan = moment(`${yearHijriNow}/9/1`, "iYYYY/iM/iD").add(
        1,
        "days",
      );
      const ramadanDay = parseInt(now.subtract(1, "days").format("iD"));
      const ramadanProgress = ((ramadanDay / 30) * 100).toFixed(0) + "%";

      return res.status(200).json({
        error: false,
        data: {
          utc,
          today: now.format("YYYY/M/D HH:mm:ss"),
          nextRamadan: whenNextRamadan.format("YYYY/M/D"),
          nextRamadanHijri: whenNextRamadan.format("iYYYY/iM/iD"),
          countdown: 0,
          isRamadanNow,
          ramadanDay,
          ramadanProgress,
        },
      });
    }

    if (!isPassedRamadanThisYear) {
      const whenNextRamadan = moment(`${yearHijriNow}/9/1`, "iYYYY/iM/iD").add(
        1,
        "days",
      );
      const countdown = whenNextRamadan.diff(now, "days") + 1;

      return res.status(200).json({
        error: false,
        data: {
          utc,
          today: now.format("YYYY/M/D HH:mm:ss"),
          nextRamadan: whenNextRamadan.format("YYYY/M/D"),
          nextRamadanHijri: whenNextRamadan.format("iYYYY/iM/iD"),
          countdown,
          isRamadanNow,
          ramadanDay: 0,
          ramadanProgress: "0%",
        },
      });
    }

    if (isPassedRamadanThisYear) {
      const whenNextRamadan = moment(
        `${yearHijriNow + 1}/9/1`,
        "iYYYY/iM/iD",
      ).add(1, "days");
      const countdown = whenNextRamadan.diff(now, "days") + 1;

      return res.status(200).json({
        error: false,
        data: {
          utc,
          today: now.format("YYYY/M/D HH:mm:ss"),
          nextRamadan: whenNextRamadan.format("YYYY/M/D"),
          nextRamadanHijri: whenNextRamadan.format("iYYYY/iM/iD"),
          countdown,
          isRamadanNow,
          ramadanDay: 0,
          ramadanProgress: "0%",
        },
      });
    }
  } catch (err) {
    res.status(200).json({ error: true, data: {} });
  }
}
