const db = require('sqlite')
const moment = require('moment')

const Constants = require('./Constants')

class Schedules {

    constructor() {

    }

    static getScheduleBy(id) {

        return db.get('SELECT * FROM Schedule WHERE id = ?', id)
    }

    static getSchedules(startdatetime, enddatetime) {

        const startDate = startdatetime ? startdatetime : Constants.MIN_DATE_TEXT

        let endDate = enddatetime

        if (!endDate) {
            if (startDate === Constants.MIN_DATE_TEXT) {
                endDate = Constants.MAX_DATE_TEXT
            } else {
                endDate = moment(startdatetime).add(1, 'day').startOf('day').format(Constants.SQL_DATEFORMAT)
            }
        }

        return db.all(`SELECT id, 
                              name, 
                              type, 
                              startdatetime, 
                              enddatetime
                         FROM Schedule 
                        WHERE DATETIME(startdatetime) > DATETIME($startdatetime)
                          AND DATETIME(enddatetime)   < DATETIME($enddatetime)
                      `, 
                      { 
                          $startdatetime: startDate, 
                          $enddatetime:   endDate
                      })
    }

}

module.exports = Schedules