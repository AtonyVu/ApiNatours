
  var multer  =   require('multer');
  const { exec } = require('child_process');
  var storage =    multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null,  Date.now()+"-"+file.originalname );
    }
  });
  var upload =  multer({ storage : storage}).single('userPhoto');
const uploadMp3 = async (req, res) => {
   await upload(req,res,function(err,result) {
        if(err) {
            return res.end("Error uploading file.");
        }
        runShell(res,req)
        const file = req.file
        res.json(file);
    });   
  };
const  runShell = async (req, res) => {
var yourscript = exec('luan.txt',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
            
        })
}
  module.exports = {
   uploadMp3
  };
  