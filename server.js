const moment = require('moment')
const db = require('sqlite')

const Constants = require('./src/Constants')

const SeedDb = require('./src/SeedDb')

const SchedulesDb = require('./src/SchedulesDb')
const RecurringDb = require('./src/RecurringDb')

function tester() {

    // SeedDb.seed()
    //     .then(() => {
    //         console.log('SEEDED')
    //     })
    //     .catch((err) => console.error(err.stack))

    const schedulesDb = new SchedulesDb()

    schedulesDb.getSchedule(1)
        .then((o) => console.log('SELECTED', o))

    schedulesDb.getSchedules()
        .then((o) => console.log('LISTED', o))

    schedulesDb.getSchedule(1)
        .then((o) => schedulesDb.updateSchedule(o))
        .then((o) => console.log('UPDATED', o))
        .catch((err) => console.log(err))

    const testSchedule = {
        'name': 'TEST MEETING INSERT',
        'type': 1,
        'startdatetime': '10/06/2017 07:00 PM',
        'enddatetime': '10/06/2017 08:00 PM'
    }

    // ---

    const recurringDb = new RecurringDb()

    recurringDb.getSchedule(1)
        .then((o) => console.log('SELECTED', o))

    recurringDb.getSchedules()
        .then((o) => console.log('LISTED', o))

    recurringDb.getSchedule(1)
        .then((o) => recurringDb.updateSchedule(o))
        .then((o) => console.log('UPDATED', o))
        .catch((err) => console.log(err))

    const testRecurring = {
        "name": "TEST RECURRING INSERT",
        "type": 2,
        "startdate": "10/01/2017",
        "enddate": "10/31/2017",
        "starttime": "03:00 PM",
        "endtime": "03:30 PM",
        "days": 31
      }

    recurringDb.insertSchedule(testRecurring)
        .then((o) => {
            console.log('INSERTED', o.LastID)
            recurringDb.deleteSchedule(o.lastID)
                .then((oo) => {
                    console.log('DELETED', oo)
                })
        })
        .catch((err) => console.log(err))

}

tester()