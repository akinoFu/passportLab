let database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findGithubOne: (profile) => {
    const user = database.find((user) => user.githubId === profile.id);
    return user;
  },
  addGithubAccount: (profile) => {
    const addData = {id: profile.id,
                     name: profile.username,
                     githubId: profile.id,
                     role: "user",
                    };
    database.push(addData);
  },
};

module.exports = { database, userModel };
