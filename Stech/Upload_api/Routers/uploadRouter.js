const express = require("express");
const { getfile } = require("../Controllers/getFileController");
const { uploadMp3 } = require("../Controllers/uploadController");
const router = express.Router();
router.post("/",uploadMp3);
router.get("/:namefile", getfile)

module.exports = router;