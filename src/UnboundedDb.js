const db = require('sqlite')
const moment = require('moment')

const Constants = require('./Constants')
const Common = require('./Common')

class UnboundedDb {

    constructor(path = './data/Schedules.db') {
        this.dbPath = path
    }

    getSchedule(id) {

        return db.open(this.dbPath)
            .then(() => db.get(`SELECT A.id, 
                                       A.name, 
                                	   A.type, 
                                	   A.eventdate, 
                                	   A.starttime, 
                                	   A.endtime, 
                                       A.days, 
                                       B.name typeDescription, 
                                       'unbounded' AS dbSource
                                  FROM Unbounded    A
                                  JOIN ScheduleType B ON B.id = A.type
                                 WHERE A.id = ?`,
                id))

    }

    getSchedules() {

        return db.open(this.dbPath)
            .then(() => {

                return db.all(`
                                SELECT A.id, 
                                       A.name, 
                                	   A.type, 
                                	   A.eventdate, 
                                	   A.starttime, 
                                	   A.endtime, 
                                	   A.days, 
                                       B.name typeDescription, 
                                       'unbounded' AS dbSource
                                  FROM Unbounded A
                                  JOIN ScheduleType B ON B.id = A.type
                              `)

            })

    }

    updateSchedule(jsonRecurring) {

        return db.open(this.dbPath)
            .then(() => {

                return db.run(`UPDATE Unbounded
                                  SET name = $name, 
                                      type = $type, 
                                      eventdate = $eventdate, 
                                      starttime = $starttime, 
                                      endtime = $endtime, 
                                      days = $days
                                WHERE id = $id
                              `, {
                    $id: jsonRecurring.id,
                    $name: jsonRecurring.name,
                    $type: jsonRecurring.type,
                    $eventdate: jsonRecurring.eventdate,
                    $starttime: jsonRecurring.starttime,
                    $endtime: jsonRecurring.endtime,
                    $days: jsonRecurring.days
                })

            })

    }

    insertSchedule(jsonRecurring) {

        return db.open(this.dbPath)
            .then(() => {

                return db.run(`INSERT INTO Unbounded
                               (
                                      name, 
                                	  type, 
                                	  eventdate, 
                                	  starttime, 
                                	  endtime, 
                                	  days
                               )
                               VALUES 
                               (
                                      $name, 
                                	  $type, 
                                	  $eventdate, 
                                	  $starttime, 
                                	  $endtime, 
                                	  $days
                               )
                              `, {
                    $name: jsonRecurring.name,
                    $type: jsonRecurring.type,
                    $eventdate: jsonRecurring.eventdate,
                    $starttime: jsonRecurring.starttime,
                    $endtime: jsonRecurring.endtime,
                    $days: jsonRecurring.days
                })

            })

    }

    deleteSchedule(id) {

        return db.open(this.dbPath)
            .then(() => {

                return db.run(`DELETE FROM Unbounded
                                     WHERE id = $id
                              `, 
                {
                    $id: id
                })

            })

    }
}

module.exports = UnboundedDb