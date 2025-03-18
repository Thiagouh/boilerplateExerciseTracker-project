let users = [];
let { v4: uuid4 } = require("uuid");

function createNewUser(username) {
  const newUser = {
    _id: uuid4(),
    username: username,
    log: [],
  };
  users.push(newUser);
  return newUser;
}

function addExercises(_id, description, duration, date) {
  const user = users.find((user) => user._id === _id);
  if (user) {
    const newExercise = {
      description: description,
      duration: duration,
      date: date || new Date().toISOString().split("T")[0],
    };
    user.log.push(newExercise);
    return newExercise;
  } else {
    return null;
  }
}

function getUserById(_id) {
  return users.find((user) => user._id === _id);
}

function getUserLogs(_id, from, to, limit) {
  const user = users.find((user) => user._id === _id);
  if (!user) {
    throw new Error('User not found');
  }

  let logs = user.log;

  if (from) {
    logs = logs.filter(log => new Date(log.date) >= new Date(from));
  }

  if (to) {
    logs = logs.filter(log => new Date(log.date) <= new Date(to));
  }

  if (limit) {
    logs = logs.slice(0, limit);
  }

  return {
    username: user.username,
    count: logs.length,
    _id: user._id,
    log: logs
  };
}

function getAllUsers() {
  return users.map(user => {
    return {
      _id: user._id,
      username: user.username
    };
  });
}

module.exports = {
  createNewUser,
  addExercises,
  getUserLogs,
  getUserById,
  getAllUsers
};
