const moment = require('moment')

const Constants = require('./src/Constants')

const SchedulesDb = require('./src/SchedulesDb')
const SeedDb = require('./src/SeedDb')

function tester() {

    SeedDb.seed()
        .then(() => {
            SchedulesDb.getSchedules()
                .then((o) => {
                    console.log('GET', o)
                })
            console.log('DONE')
        })
        .catch((err) => console.error(err.stack))

}

tester()