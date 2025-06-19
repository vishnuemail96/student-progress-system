import React, { useState } from 'react';
import axios from 'axios';

const CodeforcesChecker = () => {
  const [handle, setHandle] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/codeforces/${handle}`);
      setData(res.data);
      setError('');
    } catch (err) {
      setError('⚠️ User not found or error fetching data');
      setData(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="Enter Codeforces handle"
        />
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Check
        </button>
      </div>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      {data && (
        <div className="bg-gray-500 p-4 rounded-lg mt-4 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            👤 {data.userInfo.handle}
          </h3>
          <ul className="space-y-1 text-gray-700">
            <li><strong>Rating:</strong> {data.userInfo.rating}</li>
            <li><strong>Rank:</strong> {data.userInfo.rank}</li>
            <li><strong>Solved Problems:</strong> {data.solvedProblems.length}</li>
            <li><strong>Contests Participated:</strong> {data.contestHistory.length}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CodeforcesChecker;
