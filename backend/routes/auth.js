const express = require("express");
const router = express.Router();

const { signUp, login, activeAccount, validEmail, verifyOtp, changePassword, addLables, removeLabel, modifyLabel, updateProfilePhoto, changeName, logout, updateProfile } = require("../controllers/auth");
const {  auth } = require("../middleware/Authentication");
const fileUpload = require('express-fileupload');
router.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
router.post("/signup",signUp);
router.post("/login", login);
router.get("/active/:token",auth, activeAccount);
//forgot code
router.post("/validEmail", validEmail);
router.post("/verifyOtp/:email", verifyOtp);
router.post("/changePassword/:email", changePassword);
// router.post("/addLables", changePassword);
router.post("/addLabels/:id",auth,addLables)
router.delete("/removeLabels/:id",auth,removeLabel)
router.put("/modifyLabels/:id",auth,modifyLabel)
router.put("/updateProfilePhoto/:id",auth,updateProfilePhoto)
router.put("/updateProfile/:id",auth,updateProfile)
router.get("/logout",auth,logout)













module.exports = router;