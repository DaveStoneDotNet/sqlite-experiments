const expect = require('chai').expect
const moment = require('moment')
const sqlite = require('sqlite')

const Constants = require('../src/Constants')

const SeedDb = require('../src/SeedDb')

const UnboundedDb = require('../src/UnboundedDb.js')

describe('Schedule DB', () => {

    const INSERT_DATE = '10/05/2017 05:00 PM'

    let db = null
    let unboundedDb = null

    let dbCount = 0

    const testDbPath = './data/Tests.db'

    before((done) => {
        SeedDb.seed(testDbPath)
            .then((o) => {
                unboundedDb = new UnboundedDb(testDbPath)
                done()
            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test getSchedule', (done) => {

        unboundedDb.getSchedule(1)
            .then((schedule) => {

                expect(schedule).not.to.be.null
                expect(schedule.id).to.equal(1)
                expect(schedule.name).to.equal('weekday')
                expect(schedule.type).to.equal(1)
                expect(schedule.typeDescription).to.equal('user')

                expect(schedule.starttime).to.equal('05:30')
                expect(schedule.endtime).to.equal('21:00')
                expect(schedule.days).to.equal(31)

                done()
            })
            .catch((err) => {
                console.error(err.stack)
                done()
            })

    })

    it('should test getSchedules', (done) => {

        unboundedDb.getSchedules()
            .then((schedules) => {

                expect(schedules[0]).not.to.be.null
                expect(schedules[0].id).to.equal(1)
                expect(schedules[0].name).to.equal('weekday')
                expect(schedules[0].type).to.equal(1)
                expect(schedules[0].typeDescription).to.equal('user')

                expect(schedules[0].starttime).to.equal('05:30')
                expect(schedules[0].endtime).to.equal('21:00')
                expect(schedules[0].days).to.equal(31)

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

        unboundedDb.getSchedule(5)
            .then((o) => {

                schedule = o

            })
            .then(() => {

                schedule.name = scheduleName

                unboundedDb.updateSchedule(schedule)
                    .then(() => {
                        unboundedDb.getSchedule(5)
                            .then((updateSchedule) => {

                                expect(updateSchedule).not.to.be.null
                                expect(updateSchedule.id).to.equal(5)
                                expect(updateSchedule.name).to.equal(scheduleName)
                                expect(updateSchedule.type).to.equal(3)
                                expect(updateSchedule.typeDescription).to.equal('all-day')

                                expect(updateSchedule.eventdate).to.equal('1998-09-14')
                                expect(updateSchedule.days).to.equal(0)

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

        unboundedDb.getSchedule(5)
            .then((o) => {

                schedule = o

            })
            .then(() => {

                schedule.name = scheduleName

                unboundedDb.insertSchedule(schedule)
                    .then((o) => {
                        insertedId = o.lastID
                        return unboundedDb.getSchedule(insertedId)
                    })
                    .then((updateSchedule) => {

                        expect(updateSchedule).not.to.be.null
                        expect(updateSchedule.id).to.equal(insertedId)
                        expect(updateSchedule.name).to.equal(scheduleName)
                        expect(updateSchedule.type).to.equal(3)
                        expect(updateSchedule.typeDescription).to.equal('all-day')

                        expect(updateSchedule.eventdate).to.equal('1998-09-14')
                        expect(updateSchedule.days).to.equal(0)

                        return unboundedDb.deleteSchedule(insertedId)
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

        unboundedDb.getSchedule(5)
            .then((o) => {

                schedule = o

            })
            .then(() => {

                schedule.name = scheduleName

                unboundedDb.insertSchedule(schedule)
                    .then((o) => {
                        insertedId = o.lastID
                        return unboundedDb.getSchedule(insertedId)
                    })
                    .then((updateSchedule) => {

                        expect(updateSchedule).not.to.be.null
                        expect(updateSchedule.id).to.equal(insertedId)
                        expect(updateSchedule.name).to.equal(scheduleName)
                        expect(updateSchedule.type).to.equal(3)
                        expect(updateSchedule.typeDescription).to.equal('all-day')

                        expect(updateSchedule.eventdate).to.equal('1998-09-14')
                        expect(updateSchedule.days).to.equal(0)

                        return unboundedDb.deleteSchedule(insertedId)
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