const bcryptjs = require('bcryptjs');

const bcrypt = {}; // bcrypt object

// Function to encrypt passwords
bcrypt.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

// Function to compare passwords 
bcrypt.matchPassword = async (password, savedPassword) => {
  try {
    return await bcryptjs.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = bcrypt; // export bcrypt object 