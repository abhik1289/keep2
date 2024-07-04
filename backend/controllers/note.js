const Note = require("../model/Note");
const cloudinary = require('cloudinary').v2;
const fs = require("fs")
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
exports.addNote = async (req, res) => {

    try {
        const { title, text, color, archive, pin, trash, background, labels, todo, drawing } = req.body;
        const userID = req.userID._id;
        const imageSize = 2; //size in MB
        const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif'];
        if (req.files) {
            let files = req.files.image;
            const result = await cloudinary.uploader.upload(files.tempFilePath, {
                folder: `${userID}/image`
            });
            let info;
            if (labels?.length > 0) {
                info = {
                    title, text, background, color, archive, pin, trash, userID, image: result.url, public_id: result.public_id, labelIds: labels.length > 0 && labels, todo, drawing
                };
            } else {
                info = {
                    title, text, background, color, archive, pin, trash, userID, image: result.url, public_id: result.public_id, todo, drawing
                };
            }


            const data = new Note(info);
            data.save().then((data) => {
                return res.status(200).json({ message: data })
            }).catch((error) => {
                console.log(error);
                return res.status(401).json({ message: "Data not saved" })
            })

        } else {

            const data = new Note({
                title, text, background, color, archive, pin, trash, userID, labelIds: labels, todo, drawing
            });
            data.save().then((data) => {
                return res.status(200).json({ message: data })
            }).catch((error) => {
                console.log(error);
                return res.status(401).json({ message: "Data not saved" })
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}
exports.trash = async (req, res) => {
    const getID = req.params.id;
    const trashData = await Note.findById(getID);
    if (trashData.trash === true) {
        Note.updateOne({ _id: getID }, {
            trash: false,
        }).then(() => {
            return res.status(200).json({ message: "restore" });
        }).catch((error) => {
            return res.status(400).json({ message: error.message });
        })
    } else {
        Note.updateOne({ _id: getID }, {
            trash: true,
        }).then(() => {
            return res.status(200).json({ message: "deleted" });
        }).catch((error) => {
            return res.status(400).json({ message: error.message });
        })
    }
}
exports.archive = async (req, res) => {
    const getID = req.params.id;
    const achiveData = await Note.findById(getID);
    if (achiveData.archive === true) {
        Note.updateOne({ _id: getID }, {
            archive: false,
        }).then(async () => {
            const note = await Note.findById(getID);
            return res.status(200).json({ note });
        }).catch((error) => {
            return res.status(400).json({ message: error.message });

        })
    } else {
        Note.updateOne({ _id: getID }, {
            archive: true,
        }).then(async () => {
            const note = await Note.findById(getID);

            return res.status(200).json({ note });
        }).catch((error) => {
            return res.status(400).json({ message: error.message });

        })
    }
}
exports.pin = async (req, res) => {
    const getID = req.params.id;
    const achiveData = await Note.findById(getID);
    if (achiveData.pin === true) {
        Note.updateOne({ _id: getID }, {
            pin: false,
        }).then(async () => {
            const note = await Note.findById(getID);
            return res.status(200).json({ note });
        }).catch((error) => {
            return res.status(400).json({ message: error.message });

        })
    } else {
        Note.updateOne({ _id: getID }, {
            pin: true,
        }).then(async () => {
            const note = await Note.findById(getID);

            return res.status(200).json({ note });
        }).catch((error) => {
            return res.status(400).json({ message: error.message });

        })
    }
}
exports.color = async (req, res) => {
    const getID = req.params.id;
    const { color } = req.body;
    if (!color) {
        return res.status(400).json({ message: "Invalid" });

    }
    const achiveData = await Note.findById(getID);
    if (achiveData) {
        Note.updateOne({ _id: getID }, {
            color: color,
        }).then(async () => {
            const note = await Note.findById(getID);
            return res.status(200).json({ note });
        }).catch((error) => {
            return res.status(400).json({ message: error.message });

        })
    }
}
exports.background = async (req, res) => {
    const getID = req.params.id;
    const { background } = req.body;
    if (!background) {
        return res.status(400).json({ message: "Invalid" });

    }
    const achiveData = await Note.findById(getID);
    if (achiveData) {
        Note.updateOne({ _id: getID }, {
            background: background,
        }).then(async () => {
            const note = await Note.findById(getID);
            return res.status(200).json({ note });
        }).catch((error) => {
            return res.status(400).json({ message: error.message });
        })
    }
}
exports.deleteNote = async (req, res) => {
    try {
        const delId = req.params.id;
        const checkNote = await Note.findById(delId);
        if (checkNote) {
            checkNote.public_id ? await cloudinary.uploader.destroy(checkNote.public_id) : null;
            Note.deleteOne({ _id: delId }).then(async (info) => {
                console.log(info);
                return res.status(200).json({ message: "Note has been deleted" });
            }).catch((error) => {
                return res.status(400).json({ message: error.message });
            })
        } else {
            return res.status(400).json({ message: "Invalid Id" });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

exports.noteUpdate = async (req, res) => {
    try {
        const updateId = req.params.id;
        const { title, text, color, archive, pin, trash, background, label, todo } = req.body;
        const checkNote = await Note.findById(updateId);
        if (checkNote) {
            if (req.files) {
                const file = req.files.image;
                const userID = req.userID._id;
                console.log(file);
                //image validation
                const imageSize = 2; //size in MB
                const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif']; //allowed extensions
                if (file.size / (1024 * 1024) > imageSize) {
                    return res.status(401).json({ message: "Invalid file size" });
                }
                let fileType = file.name.split(".")[1];


                //check existing image have public id
                const public_id = checkNote?.public_id;
                public_id ? await cloudinary.uploader.destroy(public_id) : null;
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: `${userID}/image`
                });

                Note.updateMany({ _id: updateId }, {
                    $set: {
                        title, text, color, archive, pin, trash, background, image: result.url, labels: [label], public_id: result.public_id, todo
                    }
                }).then(() => {
                    return res.status(200).json({ url: result.url });
                }).catch((error) => {
                    return res.status(400).json({ message: error.message });
                })

            } else {
                Note.updateMany({ _id: updateId }, {
                    $set: {
                        title, text, color, archive, pin, trash, background, labels: [label], todo
                    },
                }).then(async () => {
                    const note = await Note.findById(updateId);
                    return res.status(200).json({ note });
                }).catch((error) => {
                    return res.status(400).json({ message: error.message });
                })
            }


        } else {
            return res.status(400).json({ message: "Invalid Id" });
        }


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.searchNote = async (req, res) => {

    try {
        const searchQuery = req.params.query;
        const serachResult = await Note.find({
            title: {
                $regex: new RegExp(searchQuery)
            },
            archive: false,
            trash: false
        });
        // console.log(serachResult);
        if (serachResult) {
            return res.status(200).json({ getNotes: serachResult });
        } else {
            return res.status(400).json({ results: "No data" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getAllNotes = async (req, res) => {
    try {
        const getUserId = req.userID._id;
        const getNotes = await Note.find({ userID: getUserId, trash: false, archive: false })
        if (getNotes) {
            return res.status(200).json({ getNotes })
        } else {
            return res.status(400).json({ notes: null })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.trashNotes = async (req, res) => {
    try {
        const getUserId = req.userID._id;
        const getNotes = await Note.find({
            trash: true,
            userID: getUserId,
        });
        if (getNotes) {
            return res.status(200).json({ notes: getNotes })
        } else {
            return res.status(400).json({ notes: null })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}
exports.archiveNotes = async (req, res) => {
    const getUserId = req.userID._id;
    try {
        const getNotes = await Note.find({
            archive: true,
            userID: getUserId
        });
        if (getNotes) {
            return res.status(200).json({ notes: getNotes })
        } else {
            return res.status(400).json({ notes: null })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}
exports.copyDocument = async (req, res) => {
    try {
        const getId = req.params.id;
        const getDocument = await Note.findById(getId);

        const { title, text, userID, color, image, background, pin, archive, trash } = getDocument;
        const data = { title, text, userID, color, image, background, pin, archive, trash };
        const insertDocument = await Note.create(data);

        if (insertDocument) {
            return res.status(200).json({ message: insertDocument });
        } else {
            return res.status(400).json({ message: false });

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}
exports.labelNote = async (req, res) => {
    try {
        const getUserId = req.userID._id;
        const getId = req.params.id;
        const getNote = await Note.find({
            userID: getUserId,
            labelIds: { $elemMatch: { $eq: getId } }
        })
        if (!getNote) {
            return res.status(401).json({ getNote });
        }
        return res.status(200).json({ getNote });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}