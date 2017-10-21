const db = require('sqlite')
const moment = require('moment')

const Constants = require('./Constants')

class RecurringDb {

    constructor(path = './data/Schedules.db') {
        this.dbPath = path
    }

    getSchedule(id) {

        return db.open(this.dbPath)
            .then(() => db.get(`SELECT A.id, 
                                       A.name, 
                                	   A.type, 
                                	   A.startdate, 
                                	   A.enddate, 
                                	   A.starttime, 
                                	   A.endtime, 
                                       A.days, 
                                       B.name typeDescription
                                  FROM Recurring    A
                                  JOIN ScheduleType B ON B.id = A.type
                                 WHERE A.id = ?`, 
                                 id))

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

                return db.all(`
                                SELECT A.id, 
                                       A.name, 
                                	   A.type, 
                                	   A.startdate, 
                                	   A.enddate, 
                                	   A.starttime, 
                                	   A.endtime, 
                                	   A.days, 
                                       B.name typeDescription
                                  FROM Recurring A
                                  JOIN ScheduleType B ON B.id = A.type
                                 WHERE DATETIME(DATETIME(A.startdate || ' ' || A.starttime)) > DATETIME($startdate)
                                   AND DATETIME(DATETIME(A.startdate || ' ' || A.starttime)) < DATETIME($enddate)
                              `,
                              {
                                  $startdate: startDate,
                                  $enddate: endDate
                              })

            })

    }

    updateSchedule(jsonRecurring) {

        return db.open(this.dbPath)
            .then(() => {

                return db.run(`UPDATE Recurring
                                  SET name = $name, 
                                      type = $type, 
                                      startdate = $startdate, 
                                      enddate = $enddate
                                WHERE id = $id
                              `,
                              {
                                  $id: jsonRecurring.id, 
                                  $name: jsonRecurring.name, 
                                  $type: jsonRecurring.type, 
                                  $startdate: jsonRecurring.startdate,
                                  $enddate: jsonRecurring.enddate
                              })

            })

    }

    insertSchedule(jsonRecurring) {

        return db.open(this.dbPath)
            .then(() => {

                return db.run(`INSERT INTO Recurring
                               (
                                      name, 
                                      type, 
                                      startdate, 
                                      enddate, 
                                      starttime, 
                                      endtime
                               )
                               VALUES 
                               (
                                      $name, 
                                      $type, 
                                      $startdate, 
                                      $enddate, 
                                      $starttime, 
                                      $endtime
                               )
                              `,
                              {
                                  $name: jsonRecurring.name, 
                                  $type: jsonRecurring.type, 
                                  $startdate: jsonRecurring.startdate,
                                  $enddate: jsonRecurring.enddate, 
                                  $starttime: jsonRecurring.starttime,
                                  $endtime: jsonRecurring.endtime
                              })

            })

    }

    deleteSchedule(id) {
        
                return db.open(this.dbPath)
                    .then(() => {
        
                        return db.run(`DELETE FROM Recurring
                                        WHERE id = $id
                                      `,
                                      {
                                          $id: id
                                      })
        
                    })
        
            }
        }

module.exports = RecurringDb