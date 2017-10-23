const expect = require('chai').expect
const moment = require('moment')

const Constants = require('../src/Constants')
const Common = require('../src/Common')

const SeedDb = require('../src/SeedDb')

const SchedulesDb = require('../src/SchedulesDb')
const RecurringDb = require('../src/RecurringDb')
const UnboundedDb = require('../src/UnboundedDb')
const Schedules = require('../src/Schedules.js')


describe('Schedules', () => {

    const INSERT_DATE = '10/05/2017 05:00 PM'

    let db = null
    let schedules = null

    let dbCount = 0

    const testDbPath = './data/Tests.db'

    before((done) => {
        SeedDb.seed(testDbPath)
            .then((o) => {
                schedules = new Schedules()
                done()
            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test getMappedSchedules', (done) => {

        const appDate = Common.getAppDate('2017-10-01', '2017-10-31')

        schedules.getMappedSchedules(appDate)
            .then((mappedSchedules) => {
                expect(mappedSchedules.length).to.equal(17)
                expect(mappedSchedules[0].id).to.equal(1)
                expect(mappedSchedules[0].name).to.equal('meeting 1')
                expect(mappedSchedules[0].type).to.equal(2)
                expect(mappedSchedules[0].start).to.equal('2017-10-06 19:00')
                expect(mappedSchedules[0].end).to.equal('2017-10-06 20:00')
                expect(mappedSchedules[0].days).to.equal(0)
                expect(mappedSchedules[0].dbSource).to.equal('schedules')
                done()
            })
    })

    it('should test getDaysArray', (done) => {

        const appDate = Common.getAppDate('2017-10-01', '2017-10-31')

        schedules.getMappedRecurring(appDate)
            .then((mappedSchedules) => {

                const mappedSchedule = mappedSchedules[0]
                const daysArray = Schedules.getDaysArray(mappedSchedule)

                expect(daysArray.length).to.equal(5)

                done()
            })
    })

    it('should test includeRecurring', (done) => {

        const appDate = Common.getAppDate('2017-10-01', '2017-10-31')
        const mappedSchedules = []
        let mappedSchedule

        const recurringDb = new RecurringDb('./data/Tests.db')
        recurringDb.getSchedules(appDate.start.text, appDate.end.text)
            .then((recurringSchedules) => {

                recurringSchedules.forEach((recurringSchedule) => {

                    const includedSchedules = Schedules.includeRecurring(appDate, recurringSchedule)
                    includedSchedules.forEach((s) => mappedSchedules.push(s))
                })

                mappedSchedule = mappedSchedules[0]

                expect(mappedSchedule.id).to.equal(1)
                expect(mappedSchedule.name).to.equal('recurring 01')
                expect(mappedSchedule.type).to.equal(2)
                expect(mappedSchedule.start).to.equal('2017-10-02 15:00')
                expect(mappedSchedule.end).to.equal('2017-10-02 15:30')
                expect(mappedSchedule.days).to.equal(31) // weekdays
                expect(mappedSchedule.dbSource).to.equal('recurring')

                done()
            })
            .catch((err) => {
                console.log('ERROR', err)
                done()
            })
    })

    it('should test getMappedRecurring', (done) => {


        const appDate = Common.getAppDate('2017-10-01', '2017-10-31')

        schedules.getMappedRecurring(appDate)
            .then((mappedSchedules) => {
                expect(mappedSchedules.length).to.equal(94)
                expect(mappedSchedules[0].id).to.equal(1)
                expect(mappedSchedules[0].name).to.equal('recurring 01')
                expect(mappedSchedules[0].type).to.equal(2)
                expect(mappedSchedules[0].start).to.equal('2017-10-02 15:00')
                expect(mappedSchedules[0].end).to.equal('2017-10-02 15:30')
                expect(mappedSchedules[0].days).to.equal(31)
                expect(mappedSchedules[0].dbSource).to.equal('recurring')
                done()
            })
    })

    it('should test getPartitionedSchedules', (done) => {

        const unboundedDb = new UnboundedDb('./data/Tests.db')

        unboundedDb.getSchedules()
            .then((unboundedSchedules) => {

                const partitionedSchedules = Schedules.getPartitionedSchedules(unboundedSchedules)

                const systemSchedule = partitionedSchedules.systemSchedules[0]
                const allDaySchedule = partitionedSchedules.allDaySchedules[0]

                expect(systemSchedule.id).to.equal(1)
                expect(systemSchedule.name).to.equal('weekday')
                expect(systemSchedule.type).to.equal(1)
                expect(systemSchedule.starttime).to.equal('05:30')
                expect(systemSchedule.endtime).to.equal('21:00')
                expect(systemSchedule.days).to.equal(31) // weekdays
                expect(systemSchedule.typeDescription).to.equal('user')

                expect(allDaySchedule.id).to.equal(4)
                expect(allDaySchedule.name).to.equal('birthday')
                expect(allDaySchedule.type).to.equal(3)
                expect(allDaySchedule.eventdate).to.equal('1962-03-07')
                expect(allDaySchedule.days).to.equal(0)
                expect(allDaySchedule.typeDescription).to.equal('all-day')

                done()
            })
            .catch((err) => {
                console.log('ERROR', err)
                done()
            })
    })

    it('should test getMappedSystemSchedules', (done) => {

        const unboundedDb = new UnboundedDb('./data/Tests.db')

        unboundedDb.getSchedules()
            .then((unboundedSchedules) => {

                const partitionedSchedules = Schedules.getPartitionedSchedules(unboundedSchedules)

                const systemSchedule = partitionedSchedules.systemSchedules[0]

                expect(systemSchedule.id).to.equal(1)
                expect(systemSchedule.name).to.equal('weekday')
                expect(systemSchedule.type).to.equal(1)
                expect(systemSchedule.starttime).to.equal('05:30')
                expect(systemSchedule.endtime).to.equal('21:00')
                expect(systemSchedule.days).to.equal(31) // weekdays
                expect(systemSchedule.typeDescription).to.equal('user')

                done()
            })
            .catch((err) => {
                console.log('ERROR', err)
                done()
            })
    })

    it('should test getMappedAllDaySchedules', (done) => {

        const unboundedDb = new UnboundedDb('./data/Tests.db')

        unboundedDb.getSchedules()
            .then((unboundedSchedules) => {

                const partitionedSchedules = Schedules.getPartitionedSchedules(unboundedSchedules)

                const allDaySchedule = partitionedSchedules.allDaySchedules[0]

                expect(allDaySchedule.id).to.equal(4)
                expect(allDaySchedule.name).to.equal('birthday')
                expect(allDaySchedule.type).to.equal(3)
                expect(allDaySchedule.eventdate).to.equal('1962-03-07')
                expect(allDaySchedule.days).to.equal(0)
                expect(allDaySchedule.typeDescription).to.equal('all-day')

                done()
            })
            .catch((err) => {
                console.log('ERROR', err)
                done()
            })
    })

    it('should test getMappedUnbounded', (done) => {

        const appDate = Common.getAppDate('2017-10-01', '2017-10-31')

        schedules.getMappedUnbounded(appDate)
            .then((unboundedSchedules) => {

                const unboundedSchedule = unboundedSchedules[0]

                expect(unboundedSchedule.id).to.equal(1)
                expect(unboundedSchedule.name).to.equal('weekday')
                expect(unboundedSchedule.type).to.equal(1)
                expect(unboundedSchedule.start).to.equal('2017-10-02 05:30')
                expect(unboundedSchedule.end).to.equal('2017-10-02 21:00')
                expect(unboundedSchedule.days).to.equal(31) // weekdays
                expect(unboundedSchedule.dbSource).to.equal('unbounded')

                done()
            })
    })

    it('should test getMappedScheduleDefinitions', (done) => {


        const schedules = new Schedules(testDbPath)

        schedules.getMappedScheduleDefinitions('2017-10-01', '2017-10-31')
            .then((scheduleDefinitions) => {

                const schedule = scheduleDefinitions[0]

                expect(schedule.id).to.equal(1)
                expect(schedule.name).to.equal('meeting 1')
                expect(schedule.type).to.equal(2)
                expect(schedule.start).to.equal('2017-10-06 19:00')
                expect(schedule.end).to.equal('2017-10-06 20:00')
                expect(schedule.starttime).to.equal('')
                expect(schedule.endtime).to.equal('')
                expect(schedule.days).to.equal(0)
                expect(schedule.dbSource).to.equal('schedules')

                done()
            })
    })

    it('should test getMappedRecurringDefinitions', (done) => {

        const schedules = new Schedules(testDbPath)

        schedules.getMappedRecurringDefinitions()
            .then((scheduleDefinitions) => {

                const recurring = scheduleDefinitions[0]

                expect(recurring.id).to.equal(1)
                expect(recurring.name).to.equal('recurring 01')
                expect(recurring.type).to.equal(2)
                expect(recurring.start).to.equal('2017-10-01')
                expect(recurring.end).to.equal('2017-10-31')
                expect(recurring.starttime).to.equal('15:00')
                expect(recurring.endtime).to.equal('15:30')
                expect(recurring.days).to.equal(31)
                expect(recurring.dbSource).to.equal('recurring')

                done()
            })
    })

    it('should test getMappedUnboundedDefinitions', (done) => {

        const schedules = new Schedules(testDbPath)

        schedules.getMappedUnboundedDefinitions()
            .then((scheduleDefinitions) => {

                const unbounded = scheduleDefinitions[0]

                expect(unbounded.id).to.equal(1)
                expect(unbounded.name).to.equal('weekday')
                expect(unbounded.type).to.equal(1)
                expect(unbounded.start).to.equal('')
                expect(unbounded.end).to.equal('')
                expect(unbounded.starttime).to.equal('05:30')
                expect(unbounded.endtime).to.equal('21:00')
                expect(unbounded.days).to.equal(31)
                expect(unbounded.dbSource).to.equal('unbounded')

                done()
            })
    })

    it('should test getScheduleDefinitions', (done) => {

        const schedules = new Schedules(testDbPath)

        schedules.getScheduleDefinitions('2017-10-01', '2017-10-31')
            .then((scheduleDefinitions) => {

                const schedule = scheduleDefinitions[0]
                const recurring = scheduleDefinitions[17]
                const unbounded = scheduleDefinitions[42]

                expect(scheduleDefinitions.length).to.equal(48)

                expect(schedule.id).to.equal(1)
                expect(schedule.name).to.equal('meeting 1')
                expect(schedule.type).to.equal(2)
                expect(schedule.start).to.equal('2017-10-06 19:00')
                expect(schedule.end).to.equal('2017-10-06 20:00')
                expect(schedule.starttime).to.equal('')
                expect(schedule.endtime).to.equal('')
                expect(schedule.days).to.equal(0)
                expect(schedule.dbSource).to.equal('schedules')

                expect(recurring.id).to.equal(1)
                expect(recurring.name).to.equal('recurring 01')
                expect(recurring.type).to.equal(2)
                expect(recurring.start).to.equal('2017-10-01')
                expect(recurring.end).to.equal('2017-10-31')
                expect(recurring.starttime).to.equal('15:00')
                expect(recurring.endtime).to.equal('15:30')
                expect(recurring.days).to.equal(31)
                expect(recurring.dbSource).to.equal('recurring')

                expect(unbounded.id).to.equal(1)
                expect(unbounded.name).to.equal('weekday')
                expect(unbounded.type).to.equal(1)
                expect(unbounded.start).to.equal('')
                expect(unbounded.end).to.equal('')
                expect(unbounded.starttime).to.equal('05:30')
                expect(unbounded.endtime).to.equal('21:00')
                expect(unbounded.days).to.equal(31)
                expect(unbounded.dbSource).to.equal('unbounded')

                done()
            })
    })

    it('should test getSchedules', (done) => {

        const schedules = new Schedules(testDbPath)

        schedules.getSchedules('2017-10-01', '2017-10-31')
            .then((mappedSchedules) => {

                const mappedSchedule = mappedSchedules[0]

                expect(mappedSchedules.length).to.equal(163)

                expect(mappedSchedule.id).to.equal(1)
                expect(mappedSchedule.name).to.equal('meeting 1')
                expect(mappedSchedule.type).to.equal(2)
                expect(mappedSchedule.start).to.equal('2017-10-06 19:00')
                expect(mappedSchedule.end).to.equal('2017-10-06 20:00')
                expect(mappedSchedule.days).to.equal(0)
                expect(mappedSchedule.dbSource).to.equal('schedules')

                done()
            })

    })

    it('should test getTodaysSchedules', (done) => {

        const schedules = new Schedules(testDbPath)

        schedules.getSchedules('2017-10-01')
            .then((mappedSchedules) => {

                const mappedSchedule = mappedSchedules[0]

                expect(mappedSchedules.length).to.equal(2)

                expect(mappedSchedule.id).to.equal(17)
                expect(mappedSchedule.name).to.equal('recurring 17')
                expect(mappedSchedule.type).to.equal(2)
                expect(mappedSchedule.start).to.equal('2017-10-01 11:00')
                expect(mappedSchedule.end).to.equal('2017-10-01 11:30')
                expect(mappedSchedule.days).to.equal(127)
                expect(mappedSchedule.dbSource).to.equal('recurring')

                done()
            })
    })
})