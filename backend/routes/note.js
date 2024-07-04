const express = require("express");
const { addNote, trash, archive, deleteNote, noteUpdate, searchNote, getAllNotes, trashNotes, archiveNotes, uploadFile, copyDocument, labelNote, pin, color, background } = require("../controllers/note");
const router = express.Router();
const Joi = require('joi');

const validator = require('express-joi-validation').createValidator({});
const { auth } = require("../middleware/Authentication");
// const fileUpload = require('express-fileupload');
// router.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));
const noteSchema = Joi.object({
    title: Joi.string().min(5).max(100),
    text: Joi.string().min(0).max(500)
})


router.post('/addNote', auth, addNote);
router.get('/trash/:id', auth, trash);
router.get('/archived/:id', auth, archive);
router.get('/pin/:id', auth, pin);
router.put('/color/:id', auth, color);
router.put('/background/:id', auth, background);
router.delete('/delete/:id', auth, deleteNote);
router.put('/update/:id', auth, noteUpdate);
router.get('/serach/:query', auth, searchNote);
router.get('/getNotes', auth, getAllNotes);
router.get('/trashNote', auth, trashNotes);
router.get('/archiveNote', auth, archiveNotes);
router.get('/copyNote/:id', auth, copyDocument);
router.get('/labelNote/:id', auth, labelNote);







module.exports = router;