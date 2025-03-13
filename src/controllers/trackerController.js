const trackerService = require('../services/trackerService');

const newUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await trackerService.createNewUser(username);
    res.json({
      username: user.username,
      _id: user._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addExercises = async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  try {
    const exercise = await trackerService.addExercises(_id, description, duration, date);
    const user = await trackerService.getUserById(_id);
    res.json({
      _id: user._id,
      username: user.username,
      date: new Date(exercise.date).toDateString(),
      duration: exercise.duration,
      description: exercise.description
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserLogs = async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;
  try {
    const logs = await trackerService.getUserLogs(_id, from, to, limit);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  newUser,
  addExercises,
  getUserLogs,
};