const trackerService = require('../services/trackerService');

const newUser = async (req, res) => {
  const { username } = req.body;
  console.log("Create new user:", username);
  try {
    const user = await trackerService.createNewUser(username);
    res.json({
      username: user.username,
      _id: user._id
    });
  } catch (error) {
    console.error("Error creating new user:", error.message);	
    res.status(500).json({ error: error.message });
  }
};

const addExercises = async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  console.log("Add exercises:", description, duration, date);
  try {
    const exercise = await trackerService.addExercises(_id, description, duration, date);
    const user = await trackerService.getUserById(_id);
    res.json({
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
      _id: user._id,
    });
  } catch (error) {
    console.error("Error adding exercises:", error.message)
    res.status(500).json({ error: error.message });
  }
};

const getUserLogs = async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;
  console.log("Get user logs:", _id, from, to, limit);
  try {
    const logs = await trackerService.getUserLogs(_id, from, to, limit);
    res.json(logs);
  } catch (error) {
    console.error("Error getting user logs:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  console.log("Get all users");
  try {
    const getAllUsers = await trackerService.getAllUsers();
    res.json(getAllUsers);
  } catch (error) {
    console.error("Error getting all users:", error.message);
    res.status.json({ error: error.message });
  }
}

module.exports = {
  newUser,
  addExercises,
  getUserLogs,
  getAllUsers,
};