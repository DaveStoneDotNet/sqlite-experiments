const moment = require('moment')

const SchedulesDb = require('./src/SchedulesDb')
const SeedDb = require('./src/SeedDb')

function tester() {

    SeedDb.seed()
        .then(() => {
            SchedulesDb.getSchedules('2017-10-06')
                .then((o) => {
                    console.log('GET', o)
                })
            console.log('DONE')
        })
        .catch((err) => console.error(err.stack))

}

tester()