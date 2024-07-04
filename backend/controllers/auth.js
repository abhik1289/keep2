const { validLength, validateEmail, generateOTP } = require("../helpers/validations");
const jwt = require("jsonwebtoken");
const user = require("../model/auth");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../helpers/sendEmail");
const Code = require("../model/Code");
const { sendOtp } = require("../helpers/sendOtp");
const cloudinary = require('cloudinary').v2;
const fs = require("fs")
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
exports.signUp = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: "Invalid" })
        }
        if (!validLength(first_name, 3, 10)) {
            return res.status(400).json({ message: "Invalid Fisrt name" })

        }
        if (!validLength(last_name, 3, 10)) {
            return res.status(400).json({ message: "Invalid Last name" })

        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email" })

        }
        const validEmail = await user.findOne({ email });
        if (validEmail) {
            return res.status(400).json({ message: "This email already exits" })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const data = new user({ first_name, last_name, email, password: hashPassword });
        data.save().then(async (info) => {
            const token = jwt.sign({ _id: data._id }, process.env.RAnDOM_KEY);
            const link = process.env.FRONTEND_URL + "active/" + token;
            await user.findByIdAndUpdate(data._id, { token: token });
            res.cookie('jwt', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 7 * 24 * 3600 * 1000)
            });
            await sendEmail(first_name, email, link)
            return res.status(200).json({
                first_name: data.first_name,
                last_name: data.last_name,
                isLogin: false,
                id: data._id
            })
        }).catch((error) => {
            return res.status(400).json({ message: error.message })
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Invalid message" })
        }

        const validEmail = await user.findOne({ email });
        if (validEmail) {
            const getpassword = validEmail.password;
            const validPassword = await bcrypt.compare(password, getpassword);
            if (validPassword) {
                res.cookie('jwt', validEmail.token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000)
                });
                return res.status(200).json({
                    first_name: validEmail.first_name,
                    last_name: validEmail.last_name,
                    isLogin: true,
                    email: validEmail.email,
                    id: validEmail._id,
                    profile_photo: validEmail.profile_photo,
                    labels: validEmail.labels
                })
            } else {
                return res.status(400).json({ message: "Wrong password" })
            }
        } else {
            return res.status(400).json({ message: "Email not exits" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}
exports.logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({ message: "updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.updateProfile = async (req, res) => {
    try {
        if (req.files) {
            const file = req.files.photo;
            const userID = req.userID._id;
            const id = req.params.id;
            const { first_name, last_name } = req.body;
            const getUSer = await user.findById(id)
            //image validation
            const imageSize = 2; //size in MB
            const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif']; //allowed extensions
            if (file.size / (1024 * 1024) > imageSize) {
                return res.status(401).json({ message: "Invalid file size" });
            }
            let fileType = file.name.split(".")[1];
            if (array_of_allowed_files.includes(fileType)) {

                //check existing image have public id
                const public_id = getUSer?.public_id;
                public_id ? await cloudinary.uploader.destroy(public_id) : null;
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: `${userID}/profilePhoto`
                });
                user.updateMany({ _id: id }, {
                    $set: {
                        first_name, last_name,
                        profile_photo: result.url,
                        public_id: result.public_id
                    }
                }).then((data) => {
                    console.log(data, first_name);
                    return res.status(200).json({ message: "ok", first_name: first_name, profile_photo: result.url, last_name: last_name });
                }).catch((error) => {
                    return res.status(400).json({ message: error.message });
                })
            } else {
                return res.status(401).json({ message: "Invalid file type" });
            }
        } else {
            const id = req.params.id;
            const { first_name, last_name } = req.body;
            user.findByIdAndUpdate(id, { first_name, last_name }).then(() => {
                return res.status(200).json({ message: "updated successfully" })
            }).catch((error) => {
                return res.status(400).json({ message: "error" })
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.activeAccount = async (req, res) => {
    try {

        const userID = req.userID;
        const getId = userID._id;
        const token = req.params.token;
        const decode = jwt.decode(token, process.env.RAnDOM_KEY);
        console.log(decode._id, getId);
        const userInfo = await user.findById(getId);
        if (userInfo.active == true) {
            res.status(400).json({ message: "Account already activated" })

        }
        if (decode._id === getId) {
            console.log("true");
            user.findByIdAndUpdate(getId, {
                active: true
            }).then((data) => {
                res.status(200).json({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    isLogin: true,
                    email: data.email,
                    id: data._id,
                });
            }).catch((err) => {
                res.status(401).json({ message: err.message })
            })
        } else {
            res.status(400).json({ message: "Invalid token" })

        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}
//forgot password
exports.validEmail = async (req, res) => {
    try {
        const { email } = req.body;


        if (!email) {
            return res.status(400).json({ message: "Invalid" })
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        const validEmail = await user.findOne({ email });
        if (!validEmail) {
            return res.status(400).json({ message: "Email not exits" })
        } else {
            const otp = generateOTP();
            sendOtp(email, otp);
            const emailExits = await Code.findOne({ email });
            if (emailExits) {
                await Code.findByIdAndUpdate(emailExits._id, {
                    otp
                }).then(() => {
                    return res.status(200).json({
                        message: "Otp send agin in your email"
                    })
                }).catch((error) => {
                    return res.status(200).json({
                        message: error.message
                    })
                })

            } else {
                const saveOTP = new Code({ otp, email }).save()
                if (saveOTP) {
                    return res.status(200).json({
                        message: "A otp send on your email"
                    })
                } else {
                    return res.status(400).json({
                        message: error.message
                    })
                }
            }



        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const email = req.params.email;
        console.log(email, otp)
        if (!otp) {
            return res.status(400).json({ message: "Invalid" })
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        const validEmail = await Code.findOne({ email });
        if (!validEmail) {
            return res.status(400).json({ message: "Email not exits" })
        } else {
            const getOtp = validEmail.otp;
            if (getOtp === otp) {
                return res.status(200).json({ message: true })
            } else {
                return res.status(400).json({ message: "Wrong otp" })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.sendAgainOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Invalid" })
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        const validEmail = await Code.findOne({ email });
        if (!validEmail) {
            return res.status(400).json({ message: "Email not exits" })
        } else {
            const otp = generateOTP();
            const getId = validEmail._id;
            await Code.findOneAndUpdate(getId, {
                otp
            }).then(() => {
                return res.status(200).json({ message: "Otp send" })
            }).catch((error) => {
                return res.status(400).json({
                    message: error.message
                })
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.changePassword = async (req, res) => {
    try {

        const { email, password } = req.body;
        const hashPWd = await bcrypt.hash(password, 10)
        if (!email || !password) {
            return res.status(400).json({ message: "Invalid" })
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        const validEmail = await user.findOne({ email });

        if (!validEmail) {
            return res.status(400).json({ message: "Email not exits" })
        }

        await user.findByIdAndUpdate(validEmail._id, {
            password: hashPWd
        }).then(async () => {
            await Code.deleteOne({ email: email });
            return res.status(200).json({ message: "Password Changed" })
        }).catch((error) => {
            return res.status(400).json({
                message: error.message
            })
        })


    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

exports.addLables = async (req, res) => {
    try {
        const { labelID, title } = req.body;
        // if (labele.length === 1) {
        //     return res.status(400).json({ message: "Invalid Length" })
        // }
        const id = req.params.id;
        user.findByIdAndUpdate(id, {
            $push: {
                labels: {
                    labelID, title
                }
            }
        }).then((data) => {
            res.status(200).json({
                lables: data.labels
            });
        }).catch(() => {
            res.status(400).json({ message: "Error occured" });
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.removeLabel = async (req, res) => {
    try {
        const { labelID } = req.body;
        const id = req.params.id;
        user.findByIdAndUpdate(id, {
            $pull: {
                "labels": {
                    labelID
                }
            }
        }).then((data) => {
            // console.log("data is",data);
            res.status(200).json({ message: "Labele removed successfully" });
        }).catch((err) => {
            console.log("---->", err);
            res.status(400).json({ message: "Error occured" });
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.modifyLabel = async (req, res) => {
    try {

        const { title, Lid } = req.body;

        const id = req.params.id;
        user.updateOne({ _id: id, "labels.labelID": Lid }, {
            $set: {
                "labels.$.title": title
            }
        }).then(() => {
            res.status(200).json({ message: "Labele modify successfully" });
        }).catch(() => {
            res.status(400).json({ message: "Error occured" });
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateProfilePhoto = async (req, res) => {
    try {
        if (req.files) {
            const file = req.files.photo;
            const userID = req.userID._id;
            const id = req.params.id;
            const getUSer = await user.findById(id)
            //image validation
            const imageSize = 2; //size in MB
            const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif']; //allowed extensions
            if (file.size / (1024 * 1024) > imageSize) {
                return res.status(401).json({ message: "Invalid file size" });
            }
            let fileType = file.name.split(".")[1];
            if (array_of_allowed_files.includes(fileType)) {

                //check existing image have public id
                const public_id = getUSer?.public_id;
                public_id ? await cloudinary.uploader.destroy(public_id) : null;
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: `${userID}/profilePhoto`
                });
                user.updateMany({ _id: id }, {
                    $set: {
                        profile_photo: result.url,
                        public_id: result.public_id
                    }
                }).then(() => {
                    return res.status(200).json({ message: "Profile Photo has been updated" });
                }).catch((error) => {
                    return res.status(400).json({ message: error.message });
                })
            } else {
                return res.status(401).json({ message: "Invalid file type" });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

