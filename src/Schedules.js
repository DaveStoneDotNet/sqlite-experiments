const moment = require('moment')

const Constants = require('./Constants')
const Common = require('./Common')

const SchedulesDb = require('./SchedulesDb')
const RecurringDb = require('./RecurringDb')
const UnboundedDb = require('./UnboundedDb')

class Schedules {

    constructor() {
        this.SchedulesDb = new SchedulesDb(Constants.SCHEDULES_DB_PATH)
        this.RecurringDb = new RecurringDb(Constants.RECURRING_DB_PATH)
        this.UnboundedDb = new UnboundedDb(Constants.UNBOUNDED_DB_PATH)
    }

    // ------------------------------------------------------------
    // SchedulesDb
    // ------------------------------------------------------------

    getMappedSchedules(appDate) {

        const localDate = Object.assign({}, appDate)

        return new Promise((resolve, reject) => {

            const mappdeSchedules = new Set()

            this.SchedulesDb.getSchedules(localDate.start.text, localDate.end.text)
                .then((schedules) => {

                    schedules.forEach((schedule) => {
                        mappdeSchedules.add({
                            id: schedule.id,
                            name: schedule.name,
                            type: schedule.type,
                            start: schedule.startdatetime,
                            end: schedule.enddatetime,
                            days: 0, 
                            dbSource: 'schedules'
                        })
                    })

                    resolve(mappdeSchedules)
                })
                .catch((err) => reject(err))
        })

    }

    // ------------------------------------------------------------
    // RecurringDb
    // ------------------------------------------------------------

    static getDaysArray(recurringSchedule) {

        const days = []

        if (recurringSchedule.days) {
            if (recurringSchedule.days & Constants.SUN) days.push(0)
            if (recurringSchedule.days & Constants.MON) days.push(1)
            if (recurringSchedule.days & Constants.TUE) days.push(2)
            if (recurringSchedule.days & Constants.WED) days.push(3)
            if (recurringSchedule.days & Constants.THU) days.push(4)
            if (recurringSchedule.days & Constants.FRI) days.push(5)
            if (recurringSchedule.days & Constants.SAT) days.push(6)
        }

        return days
    }

    static includeRecurring(appDate, recurringSchedule) {

        const includedSchedules = new Set()

        const days = Schedules.getDaysArray(recurringSchedule)

        const startMoment = Common.getDateTimeMoment(appDate.start.text)
        const endMoment = Common.getDateTimeMoment(appDate.end.text)

        const scheduleStartMoment = Common.getDateTimeMoment(recurringSchedule.startdate)
        const scheduleEndMoment = Common.getDateTimeMoment(recurringSchedule.enddate)

        for (let m = startMoment; m.isBefore(endMoment); m.add(1, 'days')) {

            const isIncluded = days.includes(m.day())

            if (isIncluded) {

                const isInRange = (m.isSame(scheduleStartMoment) || m.isAfter(scheduleStartMoment)) && m.isBefore(scheduleEndMoment)

                //console.log(`NAME: ${recurringSchedule.name} : IS IN RANGE: ${isInRange} : DATE: ${m.format(Constants.DATEFORMAT)} : START: ${scheduleStartMoment.format(Constants.DATEFORMAT)} : END: ${scheduleEndMoment.format(Constants.DATEFORMAT)} : IS BEFORE: ${m.isBefore(scheduleEndMoment)} : IS AFTER: ${m.isAfter(scheduleStartMoment)} : IS SAME: ${m.isSame(scheduleStartMoment)}`)

                if (isInRange) {
                    const schedule = {
                        id: recurringSchedule.id,
                        name: recurringSchedule.name,
                        type: recurringSchedule.type,
                        start: Common.getDateTimeText(m.format(Constants.DATEFORMAT), recurringSchedule.starttime),
                        end: Common.getDateTimeText(m.format(Constants.DATEFORMAT), recurringSchedule.endtime),
                        days: recurringSchedule.days, 
                        dbSource: 'recurring'
                    }
                    includedSchedules.add(schedule)
                }
            }
        }
        return includedSchedules
    }

    getMappedRecurring(appDate) {

        return new Promise((resolve, reject) => {

            const mappdeSchedules = new Set()

            this.RecurringDb.getSchedules(appDate.start.text, appDate.end.text)
                .then((recurringSchedules) => {

                    recurringSchedules.forEach((recurringSchedule) => {

                        const includedSchedules = Schedules.includeRecurring(appDate, recurringSchedule)
                        includedSchedules.forEach((s) => mappdeSchedules.add(s))
                    })

                    resolve(mappdeSchedules)
                })
                .catch((err) => reject(err))
        })
    }

    // ------------------------------------------------------------
    // UnboundedDb
    // ------------------------------------------------------------

    static getPartitionedSchedules(schedules) {

        const partitionedSchedules = {
            systemSchedules: new Set(),
            allDaySchedules: new Set()
        }

        schedules.forEach((s) => {
            switch (s.type) {
                case Constants.SYSTEM_TYPE:
                    partitionedSchedules.systemSchedules.add(s)
                    break
                case Constants.ALLDAY_TYPE:
                    partitionedSchedules.allDaySchedules.add(s)
                    break
            }
        })
        
        return partitionedSchedules
    }

    static getMappedSystemSchedules(appDate, systemSchedules) {

        const mappedSchedules = new Set()

        systemSchedules.forEach((systemSchedule) => {

            const days = Schedules.getDaysArray(systemSchedule)

            const startMoment = Common.getDateTimeMoment(appDate.start.text)
            const endMoment = Common.getDateTimeMoment(appDate.end.text)

            for (let m = startMoment; m.isBefore(endMoment); m.add(1, 'days')) {
                const isIncluded = days.includes(m.day())
                if (isIncluded) {

                    const startText = `${m.format(Constants.DATEFORMAT)} ${systemSchedule.starttime}`
                    const endText = `${m.format(Constants.DATEFORMAT)} ${systemSchedule.endtime}`

                    mappedSchedules.add({
                        id: systemSchedule.id,
                        name: systemSchedule.name,
                        type: systemSchedule.type,
                        start: startText,
                        end: endText,
                        days: systemSchedule.days, 
                        dbSource: 'unbounded'
                    })
                }
            }
        })

        return mappedSchedules
    }

    static getMappedAllDaySchedules(appDate, allDaySchedules) {

        const mappedSchedules = new Set()

        allDaySchedules.forEach((allDaySchedule) => {

            const startMoment = Common.getDateTimeMoment(appDate.start.text)
            const endMoment = Common.getDateTimeMoment(appDate.end.text)

            const eventdate = moment(allDaySchedule.eventdate, Constants.SQL_DATETIMEFORMAT)

            for (let m = startMoment; m.isBefore(endMoment); m.add(1, 'days')) {

                if (Common.isSameDay(m, eventdate)) {

                    const startText = `${m.format(Constants.DATEFORMAT)} 00:00`
                    const endText = `${m.format(Constants.DATEFORMAT)} 11:59:59.999 PM`

                    mappedSchedules.add({
                        id: allDaySchedule.id,
                        name: allDaySchedule.name,
                        type: allDaySchedule.type,
                        start: startText,
                        end: endText,
                        days: allDaySchedule.days, 
                        dbSource: 'unbounded'
                    })
                }
            }
        })

        return mappedSchedules
    }

    getMappedUnbounded(appDate) {

        return new Promise((resolve, reject) => {

            let mappdeSchedules = new Set()

            this.UnboundedDb.getSchedules()
                .then((schedules) => {

                    const partitionedSchedules = Schedules.getPartitionedSchedules(schedules)
                    const systemSchedules = Schedules.getMappedSystemSchedules(appDate, partitionedSchedules.systemSchedules)
                    const allDaySchedules = Schedules.getMappedAllDaySchedules(appDate, partitionedSchedules.allDaySchedules)

                    mappdeSchedules = new Set([...systemSchedules.values(), ...allDaySchedules.values()])

                    resolve(mappdeSchedules)
                })
                .catch((err) => reject(err))
        })

    }

    // ------------------------------------------------------------

    getSchedules(start, end) {

        const appDate1 = Common.getAppDate(start, end)
        const appDate2 = Common.getAppDate(start, end)
        const appDate3 = Common.getAppDate(start, end)
        
        return new Promise((resolve, reject) => {

            const p1 = this.getMappedSchedules(appDate1)
            const p2 = this.getMappedRecurring(appDate2)
            const p3 = this.getMappedUnbounded(appDate3)

            Promise.all([p1, p2, p3])
                .then((mappedSchedules) => {
                    const combinedSchedules = new Set([...mappedSchedules[0], ...mappedSchedules[1], ...mappedSchedules[2]])
                    resolve(combinedSchedules)
                    console.log('FINISHED')
                })
                .catch((err) =>
                    reject(err)
                )
        })
    }

}

module.exports = Schedules