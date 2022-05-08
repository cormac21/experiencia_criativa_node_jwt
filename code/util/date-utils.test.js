const validateTimes = require('./date-utils')

describe('Date Utils', () => {
    test('throws Error if endTime is before now', () => {
        const beforeToday = new Date();
        beforeToday.setDate(beforeToday.getDate()-5)
        expect(() => validateTimes(new Date(), beforeToday)).toThrow('endTime cannot be before startTime');
    })
})