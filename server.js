const SeedDb = require('./src/SeedDb')

function tester() {
    const seedDb = new SeedDb(':memory:')
    seedDb.seedScheduleTypes()
    //seedDb.seedSchedules()
}

tester()