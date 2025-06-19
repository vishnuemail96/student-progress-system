import React, { useState } from 'react';
import axios from 'axios';

const CodeforcesCheckerPage = () => {
  const [handle, setHandle] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setError('');
    setUserInfo(null);
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:5000/api/codeforces/user/${handle}`);
      setUserInfo(res.data);
    } catch {
      setError('User not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Codeforces Checker</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="CF handle"
          className="flex-1 border rounded px-3 py-2 focus:ring-blue-500"
          value={handle}
          onChange={e => setHandle(e.target.value)}
        />
        <button
          onClick={fetch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '🔄' : 'Check'}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {userInfo && (
        <div className="space-y-2">
          <p><strong>Handle:</strong> {userInfo.handle}</p>
          <p><strong>Rating:</strong> {userInfo.rating}</p>
          <p><strong>Max Rating:</strong> {userInfo.maxRating}</p>
          <p><strong>Rank:</strong> {userInfo.rank}</p>
        </div>
      )}
    </div>
  );
};

export default CodeforcesCheckerPage;
