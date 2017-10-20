const db = require('sqlite')

class SeedDb {

    static seed(path = './data/Schedules.db') {

        return new Promise((resolve, reject) => {
            Promise.resolve()
                .then(() => db.open(path, { Promise }))
                .then(() => db.migrate({ force: 'last' })) 
                .then(() => resolve()) 
                .catch((err) => console.error(err.stack))
        })
    }
}

module.exports = SeedDb