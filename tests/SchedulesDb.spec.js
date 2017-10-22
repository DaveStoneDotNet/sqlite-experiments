const expect = require('chai').expect
const moment = require('moment')
const sqlite = require('sqlite')

const Constants = require('../src/Constants')

const SeedDb = require('../src/SeedDb')

const SchedulesDb = require('../src/SchedulesDb.js')

describe('Schedule DB', () => {

    const INSERT_DATE = '10/05/2017 05:00 PM'

    let db = null
    let schedulesDb = null

    let dbCount = 0

    const testDbPath = './data/Tests.db'

    before((done) => {
        SeedDb.seed(testDbPath)
            .then((o) => {
                schedulesDb = new SchedulesDb(testDbPath)
                done()
            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test getSchedule', (done) => {

        schedulesDb.getSchedule(1)
            .then((schedule) => {

                expect(schedule).not.to.be.null
                expect(schedule.id).to.equal(1)
                expect(schedule.name).to.equal('meeting 1')
                expect(schedule.type).to.equal(2)
                expect(schedule.typeDescription).to.equal('system')
                expect(schedule.startdatetime).to.equal('2017-10-06 19:00')
                expect(schedule.enddatetime).to.equal('2017-10-06 20:00')
                expect(moment(schedule.startdatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true
                expect(moment(schedule.enddatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true

                done()
            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test getSchedules', (done) => {

        schedulesDb.getSchedules()
            .then((schedules) => {

                expect(schedules[0]).not.to.be.null
                expect(schedules[0].id).to.equal(1)
                expect(schedules[0].name).to.equal('meeting 1')
                expect(schedules[0].type).to.equal(2)
                expect(schedules[0].typeDescription).to.equal('system')
                expect(schedules[0].startdatetime).to.equal('2017-10-06 19:00')
                expect(schedules[0].enddatetime).to.equal('2017-10-06 20:00')
                expect(moment(schedules[0].startdatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true
                expect(moment(schedules[0].enddatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true

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

        schedulesDb.getSchedule(10)
            .then((o) => {

                schedule = o

            })
            .then(() => {

                schedule.name = scheduleName

                schedulesDb.updateSchedule(schedule)
                    .then(() => {
                        schedulesDb.getSchedule(10)
                            .then((updateSchedule) => {
                                expect(updateSchedule).not.to.be.null
                                expect(updateSchedule.id).to.equal(10)
                                expect(updateSchedule.name).to.equal(scheduleName)
                                expect(updateSchedule.type).to.equal(schedule.type)
                                expect(updateSchedule.typeDescription).to.equal(schedule.typeDescription)
                                expect(updateSchedule.startdatetime).to.equal(schedule.startdatetime)
                                expect(updateSchedule.enddatetime).to.equal(schedule.enddatetime)
                                expect(moment(updateSchedule.startdatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true
                                expect(moment(updateSchedule.enddatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true
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

        schedulesDb.getSchedule(10)
            .then((o) => {

                schedule = o

            })
            .then(() => {

                schedule.name = scheduleName

                schedulesDb.insertSchedule(schedule)
                    .then((o) => {
                        insertedId = o.lastID
                        return schedulesDb.getSchedule(insertedId)
                    })
                    .then((updateSchedule) => {

                        expect(updateSchedule).not.to.be.null
                        expect(updateSchedule.id).to.equal(insertedId)
                        expect(updateSchedule.name).to.equal(scheduleName)
                        expect(updateSchedule.type).to.equal(schedule.type)
                        expect(updateSchedule.typeDescription).to.equal(schedule.typeDescription)
                        expect(updateSchedule.startdatetime).to.equal(schedule.startdatetime)
                        expect(updateSchedule.enddatetime).to.equal(schedule.enddatetime)
                        expect(moment(updateSchedule.startdatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true
                        expect(moment(updateSchedule.enddatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true

                        return schedulesDb.deleteSchedule(insertedId)
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

        schedulesDb.getSchedule(10)
            .then((o) => {

                schedule = o

            })
            .then(() => {

                schedule.name = scheduleName

                schedulesDb.insertSchedule(schedule)
                    .then((o) => {
                        insertedId = o.lastID
                        return schedulesDb.getSchedule(insertedId)
                    })
                    .then((updateSchedule) => {

                        expect(updateSchedule).not.to.be.null
                        expect(updateSchedule.id).to.equal(insertedId)
                        expect(updateSchedule.name).to.equal(scheduleName)
                        expect(updateSchedule.type).to.equal(schedule.type)
                        expect(updateSchedule.typeDescription).to.equal(schedule.typeDescription)
                        expect(updateSchedule.startdatetime).to.equal(schedule.startdatetime)
                        expect(updateSchedule.enddatetime).to.equal(schedule.enddatetime)
                        expect(moment(updateSchedule.startdatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true
                        expect(moment(updateSchedule.enddatetime, Constants.DATETIMEFORMAT).isValid()).to.be.true

                        return schedulesDb.deleteSchedule(insertedId)
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