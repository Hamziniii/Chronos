import { Router } from "express";
import { connection } from "../processes/MongoConnection";
import { Collection } from "mongodb";
import SuperSchedual from "../SuperSchedual";
import { DateTime } from "luxon";
import SpreadSheetSchedual from "../processes/SpreadSheetSchedual";
let hhsSS = new SpreadSheetSchedual(
  {
    columns: ["G", "H", "I", "J", "K", "L", "M"],
    firstRow: 7,
    lastRow: 43,
    firstWeek: { day: 24, month: 8, year: 2020 },
    keyPath: "backend\\processes\\key.json",
    sheetName: "Semester 1",
    spreadSheetID: "1ehSc95BR3hHOO4X9-T1TEOgl5NpzG1EcVoQrbLzFKPE",
    timeZone: "America/Chicago",
  },
  1000 * 60 * 60 * 24,
  (value: string, today: DateTime) => {
    switch (Number(value)) {
      case 1:
        return "monday";
      case 2:
        switch (today.weekday) {
          case 2:
            return "tuesday";
          case 4:
            return "thursday";
          default:
            return "red";
        }
      case 3:
        switch (today.weekday) {
          case 3:
            return "wendsday";
          case 5:
            return "friday";
          default:
            return "white";
        }
      case 0:
        switch (today.weekday) {
          case 6:
            return "saturday";
          case 7:
            return "sunday";
          default:
            return "noSchool";
        }
      case 5:
        return "finals";
      default:
        return "No school";
    }
  },
  (today: DateTime) => {
    if (today.weekday < 6) {
      if (today.weekday == 1) {
        if (today.hour < 7 || (today.hour == 7 && today.minute < 10)) {
          return { days: 1 };
        }
      } else {
        if (today.hour < 7 || (today.hour == 7 && today.minute < 30)) {
          return { days: 1 };
        }
      }
    }
    return {};
  }
);
export default Router().get("/", async (req, res) => {
  res.json({ today: hhsSS.todayTag, tommorow: hhsSS.tommorowTag });
});
