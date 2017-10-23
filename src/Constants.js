const moment = require('moment')

const DATEFORMAT        = 'YYYY-MM-DD'
const TIMEFORMAT        = 'HH:mm'
const DATETIMEFORMAT    = 'YYYY-MM-DD HH:mm'
const MILLISECONDFORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'

const SQL_DATEFORMAT        = 'YYYY-MM-DD'
const SQL_TIMEFORMAT        = 'HH:MM'
const SQL_DATETIMEFORMAT    = 'YYYY-MM-DD HH:MM'
const SQL_MILLISECONDFORMAT = 'YYYY-MM-DD HH:MM:SS.SSS'

const MIN_DATE_TEXT = '0000-01-01 00:00:00.000'
const MAX_DATE_TEXT = '9999-12-31 23:59:59.999'

const MON               =  1
const TUE               =  2
const WED               =  4
const THU               =  8
const FRI               = 16
const SAT               = 32
const SUN               = 64

const WEEKDAYS          = MON | TUE | WED | THU | FRI   // 31
const WEEKENDS          = SAT | SUN                     // 96

const MOMENT_SUN        = 0
const MOMENT_MON        = 1
const MOMENT_TUE        = 2
const MOMENT_WED        = 3
const MOMENT_THU        = 4
const MOMENT_FRI        = 5
const MOMENT_SAT        = 6

const SCHEDULES_DB      =  'schedules'
const RECURRING_DB      =  'recurring'
const UNBOUNDED_DB      =  'unbounded'

const SYSTEM_SCHEDULE   =  'system'
const USER_SCHEDULE     =  'user'
const ALLDAY_SCHEDULE   =  'all-day'

const SYSTEM_TYPE = 1
const USER_TYPE   = 2
const ALLDAY_TYPE = 3

class Constants {

    static get DATEFORMAT()            { return DATEFORMAT            }
    static get TIMEFORMAT()            { return TIMEFORMAT            }
    static get DATETIMEFORMAT()        { return DATETIMEFORMAT        }
    static get MILLISECONDFORMAT()     { return MILLISECONDFORMAT     }

    static get SQL_DATEFORMAT()        { return SQL_DATEFORMAT        }
    static get SQL_TIMEFORMAT()        { return SQL_TIMEFORMAT        }
    static get SQL_DATETIMEFORMAT()    { return SQL_DATETIMEFORMAT    }
    static get SQL_MILLISECONDFORMAT() { return SQL_MILLISECONDFORMAT }

    static get MIN_MOMENT()            { return MIN_MOMENT            }
    static get MAX_MOMENT()            { return MAX_MOMENT            }

    static get MIN_DATE_TEXT()         { return MIN_DATE_TEXT         }
    static get MAX_DATE_TEXT()         { return MAX_DATE_TEXT         }

    static get MON() { return MON }
    static get TUE() { return TUE }
    static get WED() { return WED }
    static get THU() { return THU }
    static get FRI() { return FRI }
    static get SAT() { return SAT }
    static get SUN() { return SUN }

    static get MOMENT_SUN() { return MOMENT_SUN }
    static get MOMENT_MON() { return MOMENT_MON }
    static get MOMENT_TUE() { return MOMENT_TUE }
    static get MOMENT_WED() { return MOMENT_WED }
    static get MOMENT_THU() { return MOMENT_THU }
    static get MOMENT_FRI() { return MOMENT_FRI }
    static get MOMENT_SAT() { return MOMENT_SAT }

    static get WEEKDAYS() { return WEEKDAYS }
    static get WEEKENDS() { return WEEKENDS }

    static get SCHEDULES_DB() { return SCHEDULES_DB }
    static get RECURRING_DB() { return RECURRING_DB }
    static get UNBOUNDED_DB() { return UNBOUNDED_DB }

    static get SYSTEM_TYPE()     { return SYSTEM_TYPE     }
    static get USER_TYPE()       { return USER_TYPE       }
    static get ALLDAY_TYPE()     { return ALLDAY_TYPE     }

    static get SYSTEM_SCHEDULE() { return SYSTEM_SCHEDULE }
    static get USER_SCHEDULE()   { return USER_SCHEDULE   }
    static get ALLDAY_SCHEDULE() { return ALLDAY_SCHEDULE }
}

module.exports = Constants
