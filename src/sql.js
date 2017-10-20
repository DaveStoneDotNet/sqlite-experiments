// ------------------------------------------------------------------------------------------
// ScheduleType
// ------------------------------------------------------------------------------------------

const CreateScheduleTypeTable = `CREATE TABLE IF NOT EXISTS ScheduleType
                                 (
                                      id   INTEGER NOT NULL PRIMARY KEY UNIQUE,
                                      name TEXT
                                 );`

const InsertScheduleType = `INSERT INTO ScheduleType
                            (
                                id, 
                                name
                            )
                            VALUES
                            (
                                $id, 
                                $name
                            );`

const AllScheduleTypes = `SELECT id, 
                                 name
                            FROM ScheduleType;`

const DeleteScheduleTypeTable = `DELETE FROM ScheduleType;`

// ------------------------------------------------------------------------------------------
// Schedule
// ------------------------------------------------------------------------------------------

const CreateScheduleTable = `CREATE TABLE IF NOT EXISTS Schedule 
                             (
                                  id            INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                                  name          TEXT,
                                  type          INTEGER NOT NULL,
                                  startdatetime TEXT NOT NULL,
                                  enddatetime   TEXT
                             );`

const InsertSchedule = `INSERT INTO Schedule
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
                        );`

const AllSchedules = `SELECT id, 
                             name,
                             type,
                             startdatetime,
                             enddatetime
                        FROM Schedule;`

const DeleteScheduleTable = `DELETE FROM Schedule;`

// ------------------------------------------------------------------------------------------
// Recurring
// ------------------------------------------------------------------------------------------

const CreateRecurringTable = `CREATE TABLE IF NOT EXISTS Recurring 
                             (
                                  id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                                  name      TEXT,
                                  type      INTEGER NOT NULL,
                                  startdate TEXT NOT NULL,
                                  enddate   TEXT, 
                                  starttime TEXT NOT NULL,
                                  endtime   TEXT, 
                                  days      INTEGER
                                );`

const InsertRecurring = `INSERT INTO Recurring
                        (
                            name,
                            type,
                            startdate,
                            enddate, 
                            starttime,
                            endtime, 
                            days
                        )
                        VALUES
                        (
                            $name,
                            $type,
                            $startdate,
                            $enddate, 
                            $starttime,
                            $endtime, 
                            $days
                        );`

const AllRecurring = `SELECT id, 
                             name,
                             type,
                             startdate,
                             enddate, 
                             starttime,
                             endtime, 
                             days
                        FROM Recurring;`

const DeleteRecurringTable = `DELETE FROM Recurring;`

// ------------------------------------------------------------------------------------------
// Unbounded
// ------------------------------------------------------------------------------------------

const CreateUnboundedTable = `CREATE TABLE IF NOT EXISTS Unbounded 
                             (
                                  id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                                  name      TEXT,
                                  type      INTEGER NOT NULL,
                                  eventdate TEXT,
                                  starttime TEXT,
                                  endtime   TEXT, 
                                  days      INTEGER
                                );`

const InsertUnbounded = `INSERT INTO Unbounded
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
                        );`

const AllUnbounded = `SELECT id, 
                             name,
                             type,
                             eventdate,
                             starttime,
                             endtime, 
                             days
                        FROM Unbounded;`

const DeleteUnboundedTable = `DELETE FROM Unbounded;`

// ------------------------------------------------------------------------------------------

class Sql {

    static get CreateScheduleTable()     { return CreateScheduleTable }
    static get DeleteScheduleTable()     { return DeleteScheduleTable }
    static get InsertSchedule()          { return InsertSchedule }
    static get AllSchedules()            { return AllSchedules }

    static get CreateRecurringTable()    { return CreateRecurringTable }
    static get DeleteRecurringTable()    { return DeleteRecurringTable }
    static get InsertRecurring()         { return InsertRecurring }
    static get AllRecurring()            { return AllRecurring }

    static get CreateUnboundedTable()    { return CreateUnboundedTable }
    static get DeleteUnboundedTable()    { return DeleteUnboundedTable }
    static get InsertUnbounded()         { return InsertUnbounded }
    static get AllUnbounded()            { return AllUnbounded }

    static get CreateScheduleTypeTable() { return CreateScheduleTypeTable }
    static get DeleteScheduleTypeTable() { return DeleteScheduleTypeTable }
    static get InsertScheduleType()      { return InsertScheduleType }
    static get AllScheduleTypes()        { return AllScheduleTypes }
}

module.exports = Sql