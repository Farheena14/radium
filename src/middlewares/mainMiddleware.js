let validateAppType = function(req, res, next) {
    let appType = req.headers["isfreeapp"]
    if (!appType) {
        res.send({ message: 'Missing mandatory header' })
    } else {
        if (appType == 'true') {
            appType = true
        } else {
            appType = false
        }
        req.isFreeAppUser = appType
        next()
    }
}

module.exports.validateAppType = validateAppType