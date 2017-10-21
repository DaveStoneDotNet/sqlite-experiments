const moment = require('moment')
const db = require('sqlite')

const Constants = require('./src/Constants')

const SeedDb = require('./src/SeedDb')

const SchedulesDb = require('./src/SchedulesDb')
const RecurringDb = require('./src/RecurringDb')
const UnboundedDb = require('./src/UnboundedDb')

function seed() {

    SeedDb.seed()
        .then(() => {
            console.log('SEEDED')
        })
        .catch((err) => console.error(err.stack))

}

function schedules() {

    const schedulesDb = new SchedulesDb()

    schedulesDb.getSchedule(1)
        .then((o) => console.log('SELECTED SCHEDULE', o))
        .catch((err) => console.log(err))

    schedulesDb.getSchedules()
        .then((o) => console.log('LISTED SCHEDULES', o))
        .catch((err) => console.log(err))

    schedulesDb.getSchedule(1)
        .then((o) => schedulesDb.updateSchedule(o))
        .then((o) => console.log('UPDATED SCHEDULE:', o.changes))
        .catch((err) => console.log(err))

    const testSchedule = {
        'name': 'TEST MEETING INSERT',
        'type': 1,
        'startdatetime': '10/06/2017 07:00 PM',
        'enddatetime': '10/06/2017 08:00 PM'
    }

    schedulesDb.insertSchedule(testSchedule)
        .then((o) => schedulesDb.deleteSchedule(o.lastID))
        .then((o) => console.log('DELETED SCHEDULE:', o.changes))
        .catch((err) => console.log(err))

}

function recurring() {

    const recurringDb = new RecurringDb()

    recurringDb.getSchedule(1)
        .then((o) => console.log('SELECTED RECURRING', o))
        .catch((err) => console.log(err))

    recurringDb.getSchedules()
        .then((o) => console.log('LISTED RECURRING', o))
        .catch((err) => console.log(err))

    recurringDb.getSchedule(1)
        .then((o) => recurringDb.updateSchedule(o))
        .then((o) => console.log('UPDATED RECURRING:', o.changes))
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
        .then((o) => recurringDb.deleteSchedule(o.lastID))
        .then((o) => console.log('DELETED RECURRING:', o.changes))
        .catch((err) => console.log(err))

}

function unbounded() {

    const unboundedDb = new UnboundedDb()

    unboundedDb.getSchedule(1)
        .then((o) => console.log('SELECTED UNBOUNDED', o))
        .catch((err) => console.log(err))

    unboundedDb.getSchedules()
        .then((o) => console.log('LISTED UNBOUNDED', o))
        .catch((err) => console.log(err))

    unboundedDb.getSchedule(1)
        .then((o) => unboundedDb.updateSchedule(o))
        .then((o) => console.log('UPDATED UNBOUNDED:', o.changes))
        .catch((err) => console.log(err))

    const testRecurring = {
        "name": "TEST UNBOUNDED INSERT",
        "type": 2,
        "eventdate": "10/01/2017",
        "starttime": "03:00 PM",
        "endtime": "03:30 PM",
        "days": 31
    }

    unboundedDb.insertSchedule(testRecurring)
        .then((o) => unboundedDb.deleteSchedule(o.lastID))
        .then((o) => console.log('DELETED UNBOUNDED:', o.changes))
        .catch((err) => console.log(err))

}

//seed()
// schedules()
// recurring()
unbounded()