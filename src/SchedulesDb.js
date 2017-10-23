const db = require('sqlite')
const moment = require('moment')

const Constants = require('./Constants')
const Common = require('./Common')

class SchedulesDb {

    constructor(path = './data/Schedules.db') {
        this.dbPath = path
    }

    getSchedule(id) {

        return db.open(this.dbPath)
            .then(() => db.get(`SELECT A.id, 
                                       A.name, 
                                       A.type, 
                                       A.startdatetime, 
                                       A.enddatetime, 
                                       B.name typeDescription, 
                                       'schedules' AS dbSource
                                  FROM Schedule     A
                                  JOIN ScheduleType B ON B.id = A.type
                                 WHERE A.id = ?`, id))

    }

    getSchedules(startdatetime, enddatetime) {

        return db.open(this.dbPath)
            .then(() => {

                const startDate = startdatetime ? startdatetime : Constants.MIN_DATE_TEXT

                let endDate = enddatetime

                if (!endDate) {
                    if (startDate === Constants.MIN_DATE_TEXT) {
                        endDate = Constants.MAX_DATE_TEXT
                    } else {
                        endDate = Common.getNextDay(startdatetime).format(Constants.SQL_DATEFORMAT)
                    }
                }

                return db.all(`SELECT A.id, 
                                      A.name, 
                                      A.type, 
                                      A.startdatetime, 
                                      A.enddatetime, 
                                      B.name typeDescription, 
                                      'schedules' AS dbSource
                                 FROM Schedule     A
                                 JOIN ScheduleType B ON B.id = A.type
                                WHERE DATETIME(A.startdatetime) > DATETIME($startdatetime)
                                  AND DATETIME(A.enddatetime)   < DATETIME($enddatetime)
                              `, {
                    $startdatetime: startDate,
                    $enddatetime: endDate
                })

            })

    }

    updateSchedule(jsonSchedule) {

        return db.open(this.dbPath)
            .then(() => {

                return db.run(`UPDATE Schedule
                                  SET name = $name, 
                                      type = $type, 
                                      startdatetime = $startdatetime, 
                                      enddatetime = $enddatetime
                                WHERE id = $id
                              `, {
                    $id: jsonSchedule.id,
                    $name: jsonSchedule.name,
                    $type: jsonSchedule.type,
                    $startdatetime: jsonSchedule.startdatetime,
                    $enddatetime: jsonSchedule.enddatetime
                })

            })

    }

    insertSchedule(jsonSchedule) {

        return db.open(this.dbPath)
            .then(() => {

                return db.run(`INSERT INTO Schedule
                               (
                                   name, 
                                   type, 
                                   startdatetime, 
                                   enddatetime
                               )
                               VALUES 
                               (
                                   $name, 
                                   $type, 
                                   $startdatetime, 
                                   $enddatetime
                               )
                              `, {
                    $name: jsonSchedule.name,
                    $type: jsonSchedule.type,
                    $startdatetime: jsonSchedule.startdatetime,
                    $enddatetime: jsonSchedule.enddatetime
                })

            })

    }

    deleteSchedule(id) {

        return db.open(this.dbPath)
            .then(() => {

                return db.run(`DELETE FROM Schedule
                                        WHERE id = $id
                                      `, {
                    $id: id
                })

            })

    }
}

module.exports = SchedulesDb