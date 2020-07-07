let mysql = require('../db/config');

module.exports = {
    uploadimg: (req,res) => {
        res.send(req.files[0].path);
    }
}