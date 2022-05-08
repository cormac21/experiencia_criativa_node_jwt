

function validateTimes (startTime, endTime) {
    let now = new Date();
    //console.log('startTime',startTime);
    //console.log('endTime', endTime);
    if (endTime <= startTime) {
        throw new Error('endTime cannot be before startTime')
    }
    let startTimeDifferenceFromToday = (startTime - now) / 86400000;
    if ( startTimeDifferenceFromToday <= 1) {
        throw new Error('startTime cannot be so soon')
    }
}

module.exports = validateTimes;