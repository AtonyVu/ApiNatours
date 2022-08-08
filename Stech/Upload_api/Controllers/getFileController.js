
const path = require('path');
const getfile = async (req, res) => {
    var file = req.params.namefile;
    var fileLocation = path.join('./uploads',file);
    console.log(fileLocation);
    res.download(fileLocation, file);
  };

  module.exports = {
   getfile
  };
  