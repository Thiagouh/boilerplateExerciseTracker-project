const express = require("express");
const router = express.Router();
const trackerController = require('../controllers/trackerController');

router.post("/users", trackerController.newUser);
router.post("/users/:_id/exercises", trackerController.addExercises);
router.get("/users/:_id/logs", trackerController.getUserLogs);

module.exports = router;
''