const moment = require('moment')
const db = require('sqlite')

const Constants = require('./src/Constants')

const SchedulesDb = require('./src/SchedulesDb')
const SeedDb = require('./src/SeedDb')

function tester() {

    SeedDb.seed()
        .then(() => {
            console.log('SEEDED')
        })
        .catch((err) => console.error(err.stack))

    const schedulesDb = new SchedulesDb()

    schedulesDb.getScheduleBy(1)
        .then((o) => console.log('OK', o))

    schedulesDb.getSchedules()
        .then((o) => console.log('OK', o))

    schedulesDb.getScheduleBy(1)
        .then((o) => schedulesDb.updateSchedule(o))
        .then((o) => console.log('UPDATED', o))
        .catch((err) => console.log(err))
}

tester()