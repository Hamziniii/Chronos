// This is where the timings would be
/* eslint-disable */
import {DateTime, Duration,  Interval} from "luxon"
import schedules from "./HHS.json"

const zN = (n: number) => n < 10 ? "0" + n : "" + n
export const updateNextDay = (d: DateTime) => d.diffNow().milliseconds > 0 ? d : d.plus(Duration.fromObject({day: 1}))
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
export const between = (i: Interval) => i.start.toMillis() < DateTime.local().toMillis() && i.end.toMillis() > DateTime.local().toMillis() 
export function run(sched?: Schedule[]) {
    const c: Schedule[] = ((sched || schedules) as Schedule[]).map(s => {s.periods.forEach(p => {p.interval = Interval.fromDateTimes(updateNextDay(DateTime.fromObject({hour: p.start[0], minute: p.start[1]})), updateNextDay(DateTime.fromObject({hour: p.end[0], minute: p.end[1]}))); return p}) ; return s}) 
    const s: Schedule[] = ((sched || schedules) as Schedule[]).map(s => {s.periods.forEach(p => {p.interval = Interval.fromDateTimes(DateTime.fromObject({hour: p.start[0], minute: p.start[1]}), DateTime.fromObject({hour: p.end[0], minute: p.end[1]})); return p}) ; return s}) 
    let currentSchedule: Schedule
    let nextSchedule: Schedule
    
    return function (selected?: number): TimeInfo {
        let timeLeft: string, currentPeriodName: string, nextPeriodName: string
        let selected2 = ((selected || 0) + 1) % c.length
        let TYPE = 0
        currentSchedule = selected != undefined && s[selected] != undefined ? s[selected] : s.filter(_s => _s.days.includes(days.indexOf(DateTime.local().weekdayLong) as Schedule["days"][0]))[0]
        nextSchedule = selected2 != undefined && s[selected2] != undefined ? s[selected2] : s.filter(_s => _s.days.includes(days.indexOf(DateTime.local().weekdayLong) as Schedule["days"][0]))[0]
        // console.log(currentSchedule,  selected != undefined && s[selected] != undefined, days.indexOf(DateTime.local().weekdayLong))
        if(currentSchedule == undefined) {
            timeLeft = "No schedule for today"
            currentPeriodName = "n/a"
            nextPeriodName = "n/a"
        } else
            if(DateTime.local().toMillis() < currentSchedule.periods[0].interval!.start.toMillis() || DateTime.local().toMillis() > currentSchedule.periods[currentSchedule.periods.length - 1].interval!.end.toMillis()) {
                const sch = new Date().getHours() > 0 ? nextSchedule : currentSchedule
                const temp = updateNextDay(sch.periods[0].interval!.start).diffNow(["hour", "minute", "seconds"])
                timeLeft = `${temp.toObject().hours!}:${zN(temp.toObject().minutes!)}:${zN(Math.floor(temp.toObject().seconds!))}` // time left till that period starts
                currentPeriodName = "n/a"
                nextPeriodName = sch.periods[0]?.name
                TYPE = 1
            } else if (currentSchedule.periods.some(p => between(p.interval!))) {
                const temp1 = currentSchedule.periods.filter(p => between(p.interval!))[0]
                const temp2 = temp1.interval!.end.diffNow(["hour", "minute", "seconds"]) 
                timeLeft = `${temp2.toObject().hours!}:${zN(temp2.toObject().minutes!)}:${zN(Math.floor(temp2.toObject().seconds!))}` // time left till that period starts
                currentPeriodName = temp1?.name
                nextPeriodName = currentSchedule.periods[currentSchedule.periods.indexOf(temp1) + 1]?.name || "n/a"
                TYPE = 2
            } else {
                const temp1 = currentSchedule.periods[currentSchedule.periods.indexOf(currentSchedule.periods.filter(p => p.interval!.end.toMillis() < DateTime.local().toMillis()).reverse()[0]) + 1]
                const temp2 = temp1.interval!.start.diffNow(["hour", "minute", "seconds"])
                timeLeft = `${temp2.toObject().hours!}:${zN(temp2.toObject().minutes!)}:${zN(Math.floor(temp2.toObject().seconds!))}` // time left till that period starts
                currentPeriodName = "Break"
                nextPeriodName = temp1?.name || "n/a"
                TYPE = 3
            }
        // console.log(TYPE, currentSchedule.periods.map(p => [p.interval!.end.toMillis() < DateTime.local().toMillis(), p.name]))
        // console.log(timeLeft, currentPeriodName, nextPeriodName)
        return {timeLeft: "Time left: " + timeLeft, currentPeriodName, nextPeriodName}
    }

}

export interface TimeInfo {
    timeLeft: string, 
    currentPeriodName: string, 
    nextPeriodName: string
}

/* 
Find current period
    - Get info about current period
Find next period 
    - Get info about next period
If done for the day, get timing and info about next day
Allow 
*/

run()

export interface Schedule {
    name: string, // The name of the schedule 
    days: (0 | 1 | 2 | 3 | 4 | 5 | 6)[], // 0 is monday, 1 is tuesday, etc
    periods: {
        name: string, // name of the period
        activity?: string, // name of class or whatever happens during this time
        start: [number, number], // when the period starts
        end: [number, number], // when the period ends
        interval?: Interval // Luxon interval 
    }[]
}

export interface Current {
    now: Schedule["periods"][0]
}