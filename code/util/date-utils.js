

function validateTimes (startTime, endTime) {
    //let now = new Date();
    //console.log('startTime',startTime);
    //console.log('endTime', endTime);
    if(endTime <= startTime) {
        throw new Error('endTime cannot be before startTime')
    }
}

module.exports = validateTimes;