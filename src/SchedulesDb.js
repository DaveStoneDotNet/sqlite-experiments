const db = require('sqlite')
const moment = require('moment')

const Constants = require('./Constants')

class Schedules {

    constructor(path = './data/Schedules.db') {
        this.dbPath = path
    }

    getScheduleBy(id) {

        return db.open(this.dbPath)
            .then(() => db.get(`SELECT * FROM Schedule WHERE id = ?`, id))

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
                              `,
                              {
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
                              `,
                              {
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
                                      `,
                                      {
                                          $id: id
                                      })
        
                    })
        
            }
        }

module.exports = Schedules