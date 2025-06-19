const express = require('express');
const router = express.Router();
const {
  fetchUserInfo,
  fetchContestHistory,
  fetchSolvedProblems,
} = require('../utils/codeforcesApi');

// Example route
router.get('/info/:handle', async (req, res) => {
  try {
    const info = await fetchUserInfo(req.params.handle);
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
