const sqlite3 = require('sqlite3').verbose()

const Sql = require('./Sql')

const schedulesJson = require('../seed/schedules.json')
const scheduleTypesJson = require('../seed/scheduleTypes.json')

class SeedDb {

    constructor(path = './data/Schedules.db') {
        this.db = new sqlite3.Database(path)
    }

    seedScheduleTypes() {

        this.db.serialize(() => {

            this.db.run(Sql.CreateScheduleTypeTable)
            this.db.run(Sql.DeleteScheduleTypeTable)

            scheduleTypesJson.map((s) => {
                this.db.run(Sql.InsertScheduleType, {
                    $id: s.id,
                    $name: s.name
                })
            })

            this.db.each(Sql.AllScheduleTypes, (err, row) => {
                console.log(`${row.id} : ${row.name}`)
            })

            this.db.close()

            console.log('DONE')
        })

    }

    seedSchedules() {

        this.db.serialize(() => {

            this.db.run(Sql.CreateScheduleTable)
            this.db.run(Sql.DeleteScheduleTable)

            schedulesJson.map((s) => {
                this.db.run(Sql.InsertSchedule, {
                    $name: s.name,
                    $type: s.type,
                    $startdatetime: s.startdatetime,
                    $enddatetime: s.enddatetime
                })
            })

            this.db.each(Sql.AllSchedules, (err, row) => {
                console.log(`${row.id} : ${row.name}`)
            })

            this.db.close()

            console.log('DONE')
        })

    }
}

module.exports = SeedDb