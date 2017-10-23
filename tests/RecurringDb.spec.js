const expect = require('chai').expect
const moment = require('moment')
const sqlite = require('sqlite')

const Constants = require('../src/Constants')

const SeedDb = require('../src/SeedDb')

const RecurringDb = require('../src/RecurringDb.js')

describe('Recurring DB', () => {

    const INSERT_DATE = '10/05/2017 05:00 PM'

    let db = null
    let recurringDb = null

    let dbCount = 0

    const testDbPath = './data/Tests.db'

    before((done) => {
        SeedDb.seed(testDbPath)
            .then((o) => {
                recurringDb = new RecurringDb(testDbPath)
                done()
            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test getSchedule', (done) => {

        recurringDb.getSchedule(1)
            .then((schedule) => {

                expect(schedule).not.to.be.null
                expect(schedule.id).to.equal(1)
                expect(schedule.name).to.equal('recurring 01')
                expect(schedule.type).to.equal(2)
                expect(schedule.typeDescription).to.equal('system')

                expect(schedule.startdate).to.equal('2017-10-01')
                expect(schedule.enddate).to.equal('2017-10-31')
                expect(schedule.starttime).to.equal('15:00')
                expect(schedule.endtime).to.equal('15:30')
                expect(schedule.days).to.equal(31)

                expect(moment(schedule.startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                expect(moment(schedule.enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true

                expect(moment(schedule.startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                expect(moment(schedule.enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true

                done()
            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test getSchedules', (done) => {

        recurringDb.getSchedules()
            .then((schedules) => {

                expect(schedules[0]).not.to.be.null
                expect(schedules[0].id).to.equal(1)
                expect(schedules[0].name).to.equal('recurring 01')
                expect(schedules[0].type).to.equal(2)
                expect(schedules[0].typeDescription).to.equal('system')

                expect(schedules[0].startdate).to.equal('2017-10-01')
                expect(schedules[0].enddate).to.equal('2017-10-31')
                expect(schedules[0].starttime).to.equal('15:00')
                expect(schedules[0].endtime).to.equal('15:30')
                expect(schedules[0].days).to.equal(31)

                expect(moment(schedules[0].startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                expect(moment(schedules[0].enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true

                expect(moment(schedules[0].startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                expect(moment(schedules[0].enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true

                done()
            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test updateSchedule', (done) => {

        let schedule

        const scheduleName = `UPDATED NAME ${moment().format('hhmmssSSSS')}`

        recurringDb.getSchedule(10)
            .then((o) => {

                schedule = o

            })
            .then(() => {

                schedule.name = scheduleName

                recurringDb.updateSchedule(schedule)
                    .then(() => {
                        recurringDb.getSchedule(10)
                            .then((updateSchedule) => {

                                expect(updateSchedule).not.to.be.null
                                expect(updateSchedule.id).to.equal(10)
                                expect(updateSchedule.name).to.equal(scheduleName)
                                expect(updateSchedule.type).to.equal(2)
                                expect(updateSchedule.typeDescription).to.equal('system')
                
                                expect(updateSchedule.startdate).to.equal('2017-10-10')
                                expect(updateSchedule.enddate).to.equal('2017-10-22')
                                expect(updateSchedule.starttime).to.equal('01:00')
                                expect(updateSchedule.endtime).to.equal('01:30')
                                expect(updateSchedule.days).to.equal(21)
                
                                expect(moment(updateSchedule.startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                                expect(moment(updateSchedule.enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                
                                expect(moment(updateSchedule.startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                                expect(moment(updateSchedule.enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                                                
                                done()
                            })

                    })

            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test insertSchedule', (done) => {

        let schedule
        let insertedId

        const scheduleName = `UPDATED NAME ${moment().format('hhmmssSSSS')}`

        recurringDb.getSchedule(10)
            .then((o) => {

                schedule = o

            })
            .then(() => {

                schedule.name = scheduleName

                recurringDb.insertSchedule(schedule)
                    .then((o) => {
                        insertedId = o.lastID
                        return recurringDb.getSchedule(insertedId)
                    })
                    .then((updateSchedule) => {

                        expect(updateSchedule).not.to.be.null
                        expect(updateSchedule.id).to.equal(insertedId)
                        expect(updateSchedule.name).to.equal(scheduleName)
                        expect(updateSchedule.type).to.equal(2)
                        expect(updateSchedule.typeDescription).to.equal('system')
        
                        expect(updateSchedule.startdate).to.equal('2017-10-10')
                        expect(updateSchedule.enddate).to.equal('2017-10-22')
                        expect(updateSchedule.starttime).to.equal('01:00')
                        expect(updateSchedule.endtime).to.equal('01:30')
                        expect(updateSchedule.days).to.equal(21)
        
                        expect(moment(updateSchedule.startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                        expect(moment(updateSchedule.enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true
        
                        expect(moment(updateSchedule.startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                        expect(moment(updateSchedule.enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true

                        return recurringDb.deleteSchedule(insertedId)
                    })
                    .then((o) => {

                        expect(o.changes).to.equal(1)
                        done()
                    })

            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test deleteSchedule', (done) => {

        let schedule
        let insertedId

        const scheduleName = `UPDATED NAME ${moment().format('hhmmssSSSS')}`

        recurringDb.getSchedule(10)
            .then((o) => {

                schedule = o

            })
            .then(() => {

                schedule.name = scheduleName

                recurringDb.insertSchedule(schedule)
                    .then((o) => {
                        insertedId = o.lastID
                        return recurringDb.getSchedule(insertedId)
                    })
                    .then((updateSchedule) => {

                        expect(updateSchedule).not.to.be.null
                        expect(updateSchedule.id).to.equal(insertedId)
                        expect(updateSchedule.name).to.equal(scheduleName)
                        expect(updateSchedule.type).to.equal(2)
                        expect(updateSchedule.typeDescription).to.equal('system')
        
                        expect(updateSchedule.startdate).to.equal('2017-10-10')
                        expect(updateSchedule.enddate).to.equal('2017-10-22')
                        expect(updateSchedule.starttime).to.equal('01:00')
                        expect(updateSchedule.endtime).to.equal('01:30')
                        expect(updateSchedule.days).to.equal(21)
        
                        expect(moment(updateSchedule.startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                        expect(moment(updateSchedule.enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true
        
                        expect(moment(updateSchedule.startdate, Constants.DATETIMEFORMAT).isValid()).to.be.true
                        expect(moment(updateSchedule.enddate, Constants.DATETIMEFORMAT).isValid()).to.be.true

                        return recurringDb.deleteSchedule(insertedId)
                    })
                    .then((o) => {

                        expect(o.changes).to.equal(1)
                        done()
                    })

            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

})