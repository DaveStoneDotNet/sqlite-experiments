const expect = require('chai').expect
const moment = require('moment')

const Constants = require('../src/Constants')

const Common = require('../src/Common')

describe('Common', () => {

    it('should test getDateTimeText', () => {

        const dateText = '2017-10-06'
        const timeText = '07:00'

        const dateTimeText = Common.getDateTimeText(dateText, timeText)
        expect(dateTimeText).to.equal(`${dateText} ${timeText}`)

    })

    it('should test getDateTimeMoment', () => {

        const dateText = '2017-10-06'
        const timeText = '07:00'

        const dateTimeMoment = Common.getDateTimeMoment(dateText, timeText)

        expect(moment.isMoment(dateTimeMoment)).to.true
        expect(dateTimeMoment.format(Constants.DATETIMEFORMAT)).to.equal(Common.getDateTimeText(dateText, timeText))

    })

    it('should test isSameDay', () => {

        const dateText_a = '1917-10-06 03:00'
        const dateText_b = '2017-10-06 07:00'

        const dateTimeMoment_a = moment(dateText_a, Constants.DATETIMEFORMAT)
        const dateTimeMoment_b = moment(dateText_b, Constants.DATETIMEFORMAT)

        expect(Common.isSameDay(dateTimeMoment_a, dateTimeMoment_b)).to.true

    })

    it('should test ensureDateTimeMoment', () => {

        const dateTimeMoment_a = Common.ensureDateTimeMoment('1917-10-06 03:00')
        const dateTimeMoment_b = Common.ensureDateTimeMoment(new Date())
        const dateTimeMoment_c = Common.ensureDateTimeMoment(moment('2017-10-06 07:00', Constants.DATETIMEFORMAT))

        expect(moment.isMoment(dateTimeMoment_a)).to.true
        expect(moment.isMoment(dateTimeMoment_b)).to.true
        expect(moment.isMoment(dateTimeMoment_c)).to.true

    })

    it('should test ensureDateMoment', () => {

        const timeText = '12:00 AM'

        const dateTimeMoment_a = Common.ensureDateMoment('1917-10-06 07:00')
        const dateTimeMoment_b = Common.ensureDateMoment(new Date(2017, 10, 17, 7, 0))
        const dateTimeMoment_c = Common.ensureDateMoment(moment('2017-10-06 07:00', Constants.DATETIMEFORMAT))

        const time_a = dateTimeMoment_a.format('hh:mm A')
        const time_b = dateTimeMoment_b.format('hh:mm A')
        const time_c = dateTimeMoment_c.format('hh:mm A')

        expect(moment.isMoment(dateTimeMoment_a)).to.true
        expect(moment.isMoment(dateTimeMoment_b)).to.true
        expect(moment.isMoment(dateTimeMoment_c)).to.true

        expect(time_a).to.equal(timeText)
        expect(time_b).to.equal(timeText)
        expect(time_c).to.equal(timeText)
    })

    it('should test getDaysText', () => {

        expect(Common.getDaysText(0)).to.equal('')
        expect(Common.getDaysText(1)).to.equal('MON')
        expect(Common.getDaysText(2)).to.equal('TUE')
        expect(Common.getDaysText(3)).to.equal('MON:TUE')
        expect(Common.getDaysText(4)).to.equal('WED')
        expect(Common.getDaysText(5)).to.equal('MON:WED')
        expect(Common.getDaysText(6)).to.equal('TUE:WED')
        expect(Common.getDaysText(7)).to.equal('MON:TUE:WED')
        expect(Common.getDaysText(8)).to.equal('THU')
        expect(Common.getDaysText(9)).to.equal('MON:THU')
        expect(Common.getDaysText(10)).to.equal('TUE:THU')
        expect(Common.getDaysText(11)).to.equal('MON:TUE:THU')
        expect(Common.getDaysText(12)).to.equal('WED:THU')
        expect(Common.getDaysText(13)).to.equal('MON:WED:THU')
        expect(Common.getDaysText(14)).to.equal('TUE:WED:THU')
        expect(Common.getDaysText(15)).to.equal('MON:TUE:WED:THU')
        expect(Common.getDaysText(16)).to.equal('FRI')
        expect(Common.getDaysText(17)).to.equal('MON:FRI')
        expect(Common.getDaysText(18)).to.equal('TUE:FRI')
        expect(Common.getDaysText(19)).to.equal('MON:TUE:FRI')
        expect(Common.getDaysText(20)).to.equal('WED:FRI')
        expect(Common.getDaysText(21)).to.equal('MON:WED:FRI')
        expect(Common.getDaysText(22)).to.equal('TUE:WED:FRI')
        expect(Common.getDaysText(23)).to.equal('MON:TUE:WED:FRI')
        expect(Common.getDaysText(24)).to.equal('THU:FRI')
        expect(Common.getDaysText(25)).to.equal('MON:THU:FRI')
        expect(Common.getDaysText(26)).to.equal('TUE:THU:FRI')
        expect(Common.getDaysText(27)).to.equal('MON:TUE:THU:FRI')
        expect(Common.getDaysText(28)).to.equal('WED:THU:FRI')
        expect(Common.getDaysText(29)).to.equal('MON:WED:THU:FRI')
        expect(Common.getDaysText(30)).to.equal('TUE:WED:THU:FRI')
        expect(Common.getDaysText(31)).to.equal('WEEKDAYS')
        expect(Common.getDaysText(32)).to.equal('SAT')
        expect(Common.getDaysText(33)).to.equal('MON:SAT')
        expect(Common.getDaysText(34)).to.equal('TUE:SAT')
        expect(Common.getDaysText(35)).to.equal('MON:TUE:SAT')
        expect(Common.getDaysText(36)).to.equal('WED:SAT')
        expect(Common.getDaysText(37)).to.equal('MON:WED:SAT')
        expect(Common.getDaysText(38)).to.equal('TUE:WED:SAT')
        expect(Common.getDaysText(39)).to.equal('MON:TUE:WED:SAT')
        expect(Common.getDaysText(40)).to.equal('THU:SAT')
        expect(Common.getDaysText(41)).to.equal('MON:THU:SAT')
        expect(Common.getDaysText(42)).to.equal('TUE:THU:SAT')
        expect(Common.getDaysText(43)).to.equal('MON:TUE:THU:SAT')
        expect(Common.getDaysText(44)).to.equal('WED:THU:SAT')
        expect(Common.getDaysText(45)).to.equal('MON:WED:THU:SAT')
        expect(Common.getDaysText(46)).to.equal('TUE:WED:THU:SAT')
        expect(Common.getDaysText(47)).to.equal('MON:TUE:WED:THU:SAT')
        expect(Common.getDaysText(48)).to.equal('FRI:SAT')
        expect(Common.getDaysText(49)).to.equal('MON:FRI:SAT')
        expect(Common.getDaysText(50)).to.equal('TUE:FRI:SAT')
        expect(Common.getDaysText(51)).to.equal('MON:TUE:FRI:SAT')
        expect(Common.getDaysText(52)).to.equal('WED:FRI:SAT')
        expect(Common.getDaysText(53)).to.equal('MON:WED:FRI:SAT')
        expect(Common.getDaysText(54)).to.equal('TUE:WED:FRI:SAT')
        expect(Common.getDaysText(55)).to.equal('MON:TUE:WED:FRI:SAT')
        expect(Common.getDaysText(56)).to.equal('THU:FRI:SAT')
        expect(Common.getDaysText(57)).to.equal('MON:THU:FRI:SAT')
        expect(Common.getDaysText(58)).to.equal('TUE:THU:FRI:SAT')
        expect(Common.getDaysText(59)).to.equal('MON:TUE:THU:FRI:SAT')
        expect(Common.getDaysText(60)).to.equal('WED:THU:FRI:SAT')
        expect(Common.getDaysText(61)).to.equal('MON:WED:THU:FRI:SAT')
        expect(Common.getDaysText(62)).to.equal('TUE:WED:THU:FRI:SAT')
        expect(Common.getDaysText(63)).to.equal('MON:TUE:WED:THU:FRI:SAT')
        expect(Common.getDaysText(64)).to.equal('SUN')
        expect(Common.getDaysText(65)).to.equal('SUN:MON')
        expect(Common.getDaysText(66)).to.equal('SUN:TUE')
        expect(Common.getDaysText(67)).to.equal('SUN:MON:TUE')
        expect(Common.getDaysText(68)).to.equal('SUN:WED')
        expect(Common.getDaysText(69)).to.equal('SUN:MON:WED')
        expect(Common.getDaysText(70)).to.equal('SUN:TUE:WED')
        expect(Common.getDaysText(71)).to.equal('SUN:MON:TUE:WED')
        expect(Common.getDaysText(72)).to.equal('SUN:THU')
        expect(Common.getDaysText(73)).to.equal('SUN:MON:THU')
        expect(Common.getDaysText(74)).to.equal('SUN:TUE:THU')
        expect(Common.getDaysText(75)).to.equal('SUN:MON:TUE:THU')
        expect(Common.getDaysText(76)).to.equal('SUN:WED:THU')
        expect(Common.getDaysText(77)).to.equal('SUN:MON:WED:THU')
        expect(Common.getDaysText(78)).to.equal('SUN:TUE:WED:THU')
        expect(Common.getDaysText(79)).to.equal('SUN:MON:TUE:WED:THU')
        expect(Common.getDaysText(80)).to.equal('SUN:FRI')
        expect(Common.getDaysText(81)).to.equal('SUN:MON:FRI')
        expect(Common.getDaysText(82)).to.equal('SUN:TUE:FRI')
        expect(Common.getDaysText(83)).to.equal('SUN:MON:TUE:FRI')
        expect(Common.getDaysText(84)).to.equal('SUN:WED:FRI')
        expect(Common.getDaysText(85)).to.equal('SUN:MON:WED:FRI')
        expect(Common.getDaysText(86)).to.equal('SUN:TUE:WED:FRI')
        expect(Common.getDaysText(87)).to.equal('SUN:MON:TUE:WED:FRI')
        expect(Common.getDaysText(88)).to.equal('SUN:THU:FRI')
        expect(Common.getDaysText(89)).to.equal('SUN:MON:THU:FRI')
        expect(Common.getDaysText(90)).to.equal('SUN:TUE:THU:FRI')
        expect(Common.getDaysText(91)).to.equal('SUN:MON:TUE:THU:FRI')
        expect(Common.getDaysText(92)).to.equal('SUN:WED:THU:FRI')
        expect(Common.getDaysText(93)).to.equal('SUN:MON:WED:THU:FRI')
        expect(Common.getDaysText(94)).to.equal('SUN:TUE:WED:THU:FRI')
        expect(Common.getDaysText(95)).to.equal('SUN:MON:TUE:WED:THU:FRI')
        expect(Common.getDaysText(96)).to.equal('WEEKENDS')
        expect(Common.getDaysText(97)).to.equal('SUN:MON:SAT')
        expect(Common.getDaysText(98)).to.equal('SUN:TUE:SAT')
        expect(Common.getDaysText(99)).to.equal('SUN:MON:TUE:SAT')
        expect(Common.getDaysText(100)).to.equal('SUN:WED:SAT')
        expect(Common.getDaysText(101)).to.equal('SUN:MON:WED:SAT')
        expect(Common.getDaysText(102)).to.equal('SUN:TUE:WED:SAT')
        expect(Common.getDaysText(103)).to.equal('SUN:MON:TUE:WED:SAT')
        expect(Common.getDaysText(104)).to.equal('SUN:THU:SAT')
        expect(Common.getDaysText(105)).to.equal('SUN:MON:THU:SAT')
        expect(Common.getDaysText(106)).to.equal('SUN:TUE:THU:SAT')
        expect(Common.getDaysText(107)).to.equal('SUN:MON:TUE:THU:SAT')
        expect(Common.getDaysText(108)).to.equal('SUN:WED:THU:SAT')
        expect(Common.getDaysText(109)).to.equal('SUN:MON:WED:THU:SAT')
        expect(Common.getDaysText(110)).to.equal('SUN:TUE:WED:THU:SAT')
        expect(Common.getDaysText(111)).to.equal('SUN:MON:TUE:WED:THU:SAT')
        expect(Common.getDaysText(112)).to.equal('SUN:FRI:SAT')
        expect(Common.getDaysText(113)).to.equal('SUN:MON:FRI:SAT')
        expect(Common.getDaysText(114)).to.equal('SUN:TUE:FRI:SAT')
        expect(Common.getDaysText(115)).to.equal('SUN:MON:TUE:FRI:SAT')
        expect(Common.getDaysText(116)).to.equal('SUN:WED:FRI:SAT')
        expect(Common.getDaysText(117)).to.equal('SUN:MON:WED:FRI:SAT')
        expect(Common.getDaysText(118)).to.equal('SUN:TUE:WED:FRI:SAT')
        expect(Common.getDaysText(119)).to.equal('SUN:MON:TUE:WED:FRI:SAT')
        expect(Common.getDaysText(120)).to.equal('SUN:THU:FRI:SAT')
        expect(Common.getDaysText(121)).to.equal('SUN:MON:THU:FRI:SAT')
        expect(Common.getDaysText(122)).to.equal('SUN:TUE:THU:FRI:SAT')
        expect(Common.getDaysText(123)).to.equal('SUN:MON:TUE:THU:FRI:SAT')
        expect(Common.getDaysText(124)).to.equal('SUN:WED:THU:FRI:SAT')
        expect(Common.getDaysText(125)).to.equal('SUN:MON:WED:THU:FRI:SAT')
        expect(Common.getDaysText(126)).to.equal('SUN:TUE:WED:THU:FRI:SAT')
        expect(Common.getDaysText(127)).to.equal('SUN:MON:TUE:WED:THU:FRI:SAT')

    })

    it('should test getNextDay', () => {

        const dateTimeText = '2017-10-06 07:00'
        const expectedNextDay = Common.getDateTimeMoment(dateTimeText).add(1, 'day').startOf('day')
        const actualNextDay = Common.getNextDay(dateTimeText)

        expect(expectedNextDay.isSame(actualNextDay)).to.be.true

    })

    it('should test getAppDate', () => {

        const startText = '2017-10-01 01:00'
        const endText = '2017-10-01 02:00'

        const appDate = Common.getAppDate(startText, endText)

        expect(appDate.start.text).to.equal(appDate.start.moment.format(Constants.DATETIMEFORMAT))
        expect(appDate.end.text).to.equal(appDate.end.moment.format(Constants.DATETIMEFORMAT))
    })

    it('should test ensureAppDate', () => {

        const startText = '2017-10-01 01:00'
        const endText = '2017-10-01 02:00'

        const format = 'YYYY-MM-DD HH:mm:ss.SSS'

        const startMoment = moment(startText, Constants.DATETIMEFORMAT)
        const endMoment = moment(endText, Constants.DATETIMEFORMAT)

        const testDate01 = {
            start: {
                text: startText,
                moment: null
            },
            end: {
                text: endText,
                moment: null
            },
            format: format
        }

        const testDate02 = {
            start: {
                text: '',
                moment: startMoment
            },
            end: {
                text: '',
                moment: endMoment
            },
            format: format
        }

        const appDate01 = Common.ensureAppDate(testDate01)
        const appDate02 = Common.ensureAppDate(testDate02)
        
        expect(appDate01.start.text).to.equal(appDate01.start.moment.format(Constants.DATETIMEFORMAT))
        expect(appDate01.end.text).to.equal(appDate01.end.moment.format(Constants.DATETIMEFORMAT))
        expect(appDate02.start.text).to.equal(appDate02.start.moment.format(Constants.DATETIMEFORMAT))
        expect(appDate02.end.text).to.equal(appDate02.end.moment.format(Constants.DATETIMEFORMAT))
    })

    it('should test getWeekdayText', () => {

        expect(Common.getWeekdayText('2017-10-02 01:00')).to.equal('MON')
        expect(Common.getWeekdayText('2017-10-03 01:00')).to.equal('TUE')
        expect(Common.getWeekdayText('2017-10-04 01:00')).to.equal('WED')
        expect(Common.getWeekdayText('2017-10-05 01:00')).to.equal('THU')
        expect(Common.getWeekdayText('2017-10-06 01:00')).to.equal('FRI')
        expect(Common.getWeekdayText('2017-10-07 01:00')).to.equal('SAT')
        expect(Common.getWeekdayText('2017-10-08 01:00')).to.equal('SUN')
        
    })

})