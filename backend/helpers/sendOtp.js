const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.email, // generated ethereal user
      pass: process.env.password,
  }
});

exports.sendOtp=async(email,otp)=>{
  
   
  var mailOptions = {
    from: process.env.mail,
    to: email,
    subject: 'Verify Your account',
    html: `Your otp is <b>${otp}</b>`,
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
        console.log('Email sent: ' + info.response);
        return info.response;
    }
});
}