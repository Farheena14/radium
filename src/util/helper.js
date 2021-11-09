function printDate() {
    console.log(Date())
}

function printMonth() {
    const d = new Date()
    console.log(d.getMonth())
}

function getBatchInfo() {
    console.log("Batch name - Radium")
    console.log("Week - 4th")
    console.log("Todays Topic - NodeJS")
}
module.exports.printDate = printDate;
module.exports.printMonth = printMonth;
module.exports.getBatchInfo = getBatchInfo;