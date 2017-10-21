const moment = require('moment')

const Constants = require('./Constants')

class Common {

    static forEachPromise(items, fn) {
        return items.reduce((promise, item) => {
            return promise.then(() => {
                return fn(item);
            });
        }, Promise.resolve());
    }

    static getDateTimeText(date, time) {
        return `${date} ${time}`
    }

    static getDateTimeMoment(date, time) {
        return moment(Common.getDateTimeText(date, time), Constants.DATETIMEFORMAT)
    }

    static isSameDay(dateMoment_a, dateMoment_b) {
        const month_a = dateMoment_a.month()
        const month_b = dateMoment_b.month()
        const day_a = dateMoment_a.date()
        const day_b = dateMoment_b.date()
        return ((month_a === month_b) && (day_a === day_b))
    }

    static ensureDateTimeMoment(dateTime) {
        if (typeof dateTime === 'string') {
            return moment(dateTime, Constants.DATETIMEFORMAT)
        } else if (dateTime instanceof Date) {
            return moment(dateTime)
        } else if (moment.isMoment(dateTime)) {
            return dateTime
        } else {
            return moment()
        }
    }

    static ensureDateMoment(dateTime) {
        return Common.ensureDateTimeMoment(dateTime).startOf('day')
    }

    static getDaysText(days, start) {

        let daysText = ''

        if (days === 0) {
            if (start) {
                daysText = Common.ensureDateMoment(start).format('ddd').toUpperCase()
            }
        } else {
            if (days === Constants.WEEKDAYS) {
                daysText = 'WEEKDAYS'
            } else if (days === Constants.WEEKENDS) {
                daysText = 'WEEKENDS'
            } else {
                if (days & Constants.SUN) daysText += 'SUN:'
                if (days & Constants.MON) daysText += 'MON:'
                if (days & Constants.TUE) daysText += 'TUE:'
                if (days & Constants.WED) daysText += 'WED:'
                if (days & Constants.THU) daysText += 'THU:'
                if (days & Constants.FRI) daysText += 'FRI:'
                if (days & Constants.SAT) daysText += 'SAT:'
            }
        }

        daysText = daysText.endsWith(':') ? daysText.substring(0, daysText.length - 1) : daysText

        return daysText
    }

    static getNextDay(dateTimeText) {

        return Common.getDateTimeMoment(dateTimeText).add(1, 'day').startOf('day')
    }

    static getAppDate(start, end, format = 'YYYY-MM-DD HH:mm:ss.SSS') {

        const appDate = {
            start: {
                text: '',
                moment: null
            },
            end: {
                text: '',
                moment: null
            },
            format: format
        }

        if (typeof start === 'string') {
            appDate.start.text = start
            appDate.end.text = end ? end : start
        } else {
            appDate.start.moment = start
            appDate.end.moment = end ? end : start
        }

        return Common.ensureAppDate(appDate)
    }

    static ensureAppDate(appDate, format = 'YYYY-MM-DD HH:mm') {

        const mappedDate = Object.assign(appDate)

        if (!appDate.format) {
            mappedDate.format = format
        }

        if (appDate.start.text && !moment.isMoment(appDate.start.moment)) {
            mappedDate.start.moment = moment(appDate.start.text, format)
        } else {
            mappedDate.start.text = appDate.start.moment.format(format)
        }

        if (appDate.end.text && !moment.isMoment(appDate.end.moment)) {
            mappedDate.end.moment = moment(appDate.end.text, format)
        } else {
            mappedDate.end.text = appDate.end.moment.format(format)
        }

        if (appDate.start.moment.isSame(appDate.end.moment)) {
            appDate.end.moment = Common.getNextDay(appDate.start.text)
            mappedDate.end.text = appDate.end.moment.format(format)
        }

        return mappedDate
    }

    static getWeekdayText(dateText) {
        const numericDay = Common.getDateTimeMoment(dateText).day()
        switch (numericDay) {
            case Constants.MOMENT_MON:
                return 'MON'
            case Constants.MOMENT_TUE:
                return 'TUE'
            case Constants.MOMENT_WED:
                return 'WED'
            case Constants.MOMENT_THU:
                return 'THU'
            case Constants.MOMENT_FRI:
                return 'FRI'
            case Constants.MOMENT_SAT:
                return 'SAT'
            case Constants.MOMENT_SUN:
                return 'SUN'
        }
    }


}

module.exports = Common