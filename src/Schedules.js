const SeedDb = require('./SeedDb')

class Schedules {

    constructor() {

    }

    static seedDb() {

        return new Promise((resolve, reject) => {

            try {

                const seedDb = new SeedDb(':memory:')

                seedDb.seedScheduleTypes()
                    .then(() => seedDb.seedSchedules())
                    .then(() => seedDb.seedRecurring())
                    .then(() => seedDb.seedUnbounded())
                    .then(() => resolve())
                    .catch((err) => reject(err))

            } catch (err) {
                reject(err)
            }
        })

    }
}

module.exports = Schedules