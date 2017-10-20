const moment = require('moment')

const DATEFORMAT        = 'MM/DD/YYYY'
const TIMEFORMAT        = 'hhmm A'
const DATETIMEFORMAT    = 'MM/DD/YYYY hh:mm A'
const MILLISECONDFORMAT = 'MM/DD/YYYY hh:mm:ss.SSS A'

const SQL_DATEFORMAT        = 'YYYY-MM-DD'
const SQL_TIMEFORMAT        = 'HH:MM'
const SQL_DATETIMEFORMAT    = 'YYYY-MM-DD HH:MM'
const SQL_MILLISECONDFORMAT = 'YYYY-MM-DD HH:MM:SS.SSS'

const MIN_MOMENT = moment(-8640000000000000)
const MAX_MOMENT = moment(+8640000000000000)

const MIN_DATE_TEXT = moment(-8640000000000000).format(DATEFORMAT)
const MAX_DATE_TEXT = moment(+8640000000000000).format(DATEFORMAT)

const MON               =  1
const TUE               =  2
const WED               =  4
const THU               =  8
const FRI               = 16
const SAT               = 32
const SUN               = 64

const WEEKDAYS          = MON | TUE | WED | THU | FRI   // 31
const WEEKENDS          = SAT | SUN                     // 96

const SCHEDULES_DB      =  'schedules'
const RECURRING_DB      =  'recurring'
const UNBOUNDED_DB      =  'unbounded'

const SCHEDULES_DB_PATH =  './data/schedules'
const RECURRING_DB_PATH =  './data/recurring'
const UNBOUNDED_DB_PATH =  './data/unbounded'

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

    static get WEEKDAYS() { return WEEKDAYS }
    static get WEEKENDS() { return WEEKENDS }

    static get SCHEDULES_DB() { return SCHEDULES_DB }
    static get RECURRING_DB() { return RECURRING_DB }
    static get UNBOUNDED_DB() { return UNBOUNDED_DB }

    static get SYSTEM_SCHEDULE() { return SYSTEM_SCHEDULE }
    static get ALLDAY_SCHEDULE() { return ALLDAY_SCHEDULE }

    static get USER_TYPE() { return USER_TYPE }
}

module.exports = Constants
