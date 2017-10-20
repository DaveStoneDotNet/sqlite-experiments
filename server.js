const SeedDb = require('./src/SeedDb')

function tester() {

    const seedDb = new SeedDb(':memory:')

    seedDb.seedSchedules()
        .then(() => console.log('OK SCHEDULES'))
        .catch((err) => {
            console.log('ERROR', err)
        })

    seedDb.seedScheduleTypes()
        .then(() => console.log('OK TYPES'))
        .catch((err) => {
            console.log('ERROR', err)
        })

}

tester()