const axios = require('axios');

// Fetch user info and rating details
const fetchUserInfo = async (handle) => {
  const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
  return res.data.result[0];
};

// Fetch contest history
const fetchContestHistory = async (handle) => {
  const res = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
  return res.data.result;
};

// Fetch solved problems
const fetchSolvedProblems = async (handle) => {
  const res = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
  const submissions = res.data.result;

  const solved = new Set();
  submissions.forEach(sub => {
    if (sub.verdict === "OK") {
      solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
    }
  });

  return Array.from(solved);
};

module.exports = {
  fetchUserInfo,
  fetchContestHistory,
  fetchSolvedProblems
};
