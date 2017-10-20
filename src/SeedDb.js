const sqlite3 = require('sqlite3').verbose()

const Sql = require('./Sql')

const schedulesJson = require('../seed/schedules.json')
const recurringJson = require('../seed/recurring.json')
const unboundedJson = require('../seed/unbounded.json')
const scheduleTypesJson = require('../seed/scheduleTypes.json')

class SeedDb {

    constructor(path = './data/Schedules.db') {
        this.path = path
    }

    seedScheduleTypes() {

        const self = this

        return new Promise((resolve, reject) => {

            try {

                const db = new sqlite3.cached.Database(self.path)

                db.serialize(() => {

                    db.run(Sql.CreateScheduleTypeTable)
                    db.run(Sql.DeleteScheduleTypeTable)

                    scheduleTypesJson.map((s) => {
                        db.run(Sql.InsertScheduleType, {
                            $id: s.id,
                            $name: s.name
                        })
                    })

                    db.each(Sql.AllScheduleTypes, (err, row) => {
                        console.log(`${row.id} : ${row.name}`)
                    })

                    db.close()

                    resolve()
                })
            } catch (err) {
                reject(err)
            }

        })

    }

    seedSchedules() {

        const self = this

        return new Promise((resolve, reject) => {

            try {

                const db = new sqlite3.cached.Database(self.path)

                db.serialize(() => {

                    db.run(Sql.CreateScheduleTable)
                    db.run(Sql.DeleteScheduleTable)

                    schedulesJson.map((s) => {
                        db.run(Sql.InsertSchedule, {
                            $name: s.name,
                            $type: s.type,
                            $startdatetime: s.startdatetime,
                            $enddatetime: s.enddatetime
                        })
                    })

                    db.each(Sql.AllSchedules, (err, row) => {
                        console.log(`${row.id} : ${row.name} : ${row.type}`)
                    })

                    db.close()

                    resolve()
                })

            } catch (err) {
                reject(err)
            }
        })

    }

    seedRecurring() {

        const self = this

        return new Promise((resolve, reject) => {

            try {

                const db = new sqlite3.cached.Database(self.path)

                db.serialize(() => {

                    db.run(Sql.CreateRecurringTable)
                    db.run(Sql.DeleteRecurringTable)

                    recurringJson.map((s) => {
                        db.run(Sql.InsertRecurring, {
                            $name: s.name,
                            $type: s.type,
                            $startdate: s.startdate,
                            $enddate: s.enddate,
                            $starttime: s.starttime,
                            $endtime: s.endtime,
                            $days: s.days
                        })
                    })

                    db.each(Sql.AllRecurring, (err, row) => {
                        console.log(`${row.id} : ${row.name} : ${row.type}`)
                    })

                    db.close()

                    resolve()
                })

            } catch (err) {
                reject(err)
            }
        })

    }

    seedUnbounded() {

        const self = this

        return new Promise((resolve, reject) => {

            try {

                const db = new sqlite3.cached.Database(self.path)

                db.serialize(() => {

                    db.run(Sql.CreateUnboundedTable)
                    db.run(Sql.DeleteUnboundedTable)

                    unboundedJson.map((s) => {
                        db.run(Sql.InsertUnbounded, {
                            $name: s.name,
                            $type: s.type,
                            $eventdate: s.eventdate,
                            $starttime: s.starttime,
                            $endtime: s.endtime,
                            $days: s.days
                        })
                    })

                    db.each(Sql.AllUnbounded, (err, row) => {
                        console.log(`${row.id} : ${row.name} : ${row.type}`)
                    })

                    db.close()

                    resolve()
                })

            } catch (err) {
                reject(err)
            }
        })

    }

    seedDb() {

        const self = this

        return new Promise((resolve, reject) => {

            try {


            } catch (err) {
                reject(err)
            }
        })

    }
}

module.exports = SeedDb