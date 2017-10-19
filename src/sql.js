
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

class Sql {

    static get CreateScheduleTable()     { return CreateScheduleTable }
    static get DeleteScheduleTable()     { return DeleteScheduleTable }
    static get InsertSchedule()          { return InsertSchedule }
    static get AllSchedules()            { return AllSchedules }

    static get CreateScheduleTypeTable() { return CreateScheduleTypeTable }
    static get DeleteScheduleTypeTable() { return DeleteScheduleTypeTable }
    static get InsertScheduleType()      { return InsertScheduleType }
    static get AllScheduleTypes()        { return AllScheduleTypes }
}

module.exports = Sql