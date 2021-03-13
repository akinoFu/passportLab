const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const getUserByGitHubIdOrCreate = (profile) => {
  let user = userModel.findGithubOne(profile);
  if (!user) {
    userModel.addGithubAccount(profile);
    user = userModel.findGithubOne(profile);
    
  }
  return user;
};


module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate,
};
