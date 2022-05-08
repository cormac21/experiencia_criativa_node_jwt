const validateTimes = require('./date-utils')

describe('Date Utils', () => {
    test('throws Error if endTime is before now', () => {
        const beforeToday = new Date();
        beforeToday.setDate(beforeToday.getDate()-5)
        expect(() => validateTimes(new Date(), beforeToday)).toThrow('endTime cannot be before startTime');
    })
    test('throws Error if startTime is one day from now', () => {
        const todayPlusOne = new Date();
        todayPlusOne.setDate(todayPlusOne.getDate()+1)
        const future = new Date().setDate(new Date().getDate()+30);
        expect(() => validateTimes(todayPlusOne, future)).toThrow('startTime cannot be so soon');
    })
})