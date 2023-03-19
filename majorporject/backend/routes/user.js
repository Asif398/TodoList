const express = require("express");
const router = express.Router();
const {signup,signin,updateProfile,allProfile,singleProfile} = require("../controllers/user.js");
const {verifiedToken} = require("../middleware/token")

router.post("/signup",signup);
router.post("/signin",signin);
router.put("/updateprofile/user/:id",verifiedToken,updateProfile);
router.get("/allProfile/user",verifiedToken,allProfile);
router.get("/singleProfile/user/:id",verifiedToken,singleProfile);



module.exports = router;