data = require('../models/todo')

module.exports = {
  getData: (req, res) => {    
    res.status(200).send(data.TODOs)
  }
}