// Validate lowercase letters
const lowerCaseLetters = /[a-z]/g;
// Validate capital letters
const upperCaseLetters = /[A-Z]/g;
// Validate numbers
const numbers = /[0-9]/g;
// Special Character
const specialCharacter = /\W/g;

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

function verifyPassword(password) {
  if (!password.match(lowerCaseLetters)) {
    return {
      verified: false,
      msg: "Password must containe lower case letter",
    };
  }
  if (!password.match(upperCaseLetters)) {
    return {
      verified: false,
      msg: "Password must containe one upper case letter",
    };
  }
  if (!password.match(numbers)) {
    return {
      verified: false,
      msg: "Password must containe number",
    };
  }
  if (!password.match(specialCharacter)) {
    return {
      verified: false,
      msg: "Password must containe special character",
    };
  }
  if (password.length < 8) {
    return {
      verified: false,
      msg: "Password must contain at least 8 characters",
    };
  }
  return {
    verified: true,
    msg: "Succed",
  };
}

function verifyEmail(email) {
  if (!email.match(emailRegex)) {
    return false;
  }
  return true;
}

module.exports = { verifyPassword, verifyEmail };
