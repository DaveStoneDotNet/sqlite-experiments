const moment = require('moment')
const db = require('sqlite')

const Constants = require('./src/Constants')

const SchedulesDb = require('./src/SchedulesDb')
const SeedDb = require('./src/SeedDb')

function tester() {

    // SeedDb.seed()
    //     .then(() => {
    //         console.log('SEEDED')
    //     })
    //     .catch((err) => console.error(err.stack))

    const schedulesDb = new SchedulesDb()

    schedulesDb.getScheduleBy(1)
        .then((o) => console.log('SELECTED', o))

    schedulesDb.getSchedules()
        .then((o) => console.log('LISTED', o))

    schedulesDb.getScheduleBy(1)
        .then((o) => schedulesDb.updateSchedule(o))
        .then((o) => console.log('UPDATED', o))
        .catch((err) => console.log(err))

    const testInsert = {
        'name': 'TEST MEETING INSERT',
        'type': 1,
        'startdatetime': '10/06/2017 07:00 PM',
        'enddatetime': '10/06/2017 08:00 PM'
    }

    schedulesDb.insertSchedule(testInsert)
        .then((o) => {
            console.log('INSERTED', o.LastID)
            schedulesDb.deleteSchedule(o.lastID)
                .then((oo) =>{ 
                    console.log('DELETED', oo)
                })
        })
        .catch((err) => console.log(err))

}

tester()