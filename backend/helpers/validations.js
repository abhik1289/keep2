exports.validLength=(text, min, max)=>{
    if (text.length > max || text.length < min) {
        return false;
      }
      return true;
}
exports.validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
  };

exports.generateOTP=() =>{
          
  // Declare a digits variable 
  // which stores all digits
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i <5; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}