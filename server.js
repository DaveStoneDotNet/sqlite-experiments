// const SeedDb = require('./src/SeedDb')
const Schedules = require('./src/Schedules')

function tester() {

    Schedules.seedDb()
        .then(() => console.log('DONE'))
        .catch((err) => console.log('ERROR', err))
}

tester()