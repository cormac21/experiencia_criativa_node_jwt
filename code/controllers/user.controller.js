const models = require('../../models')

function save(req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    models.User.create(user).then( result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    });

}

module.exports = {
    save: save
}