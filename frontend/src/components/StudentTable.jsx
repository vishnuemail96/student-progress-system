import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentTable = ({ students, onDelete, onEdit, loading }) => {
  const nav = useNavigate();
  

  return (
    <div className="overflow-x-auto bg-white rounded shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-600">
          <tr>
            {[
              'Name',
              'Email',
              'Phone',
              'CF Handle',
              'Curr Rating',
              'Max Rating',
              'Last Sync',
              'Actions',
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-white font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td colSpan="8" className="p-4 text-center">
                Loading...
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.phone}</td>
                <td className="px-4 py-2">{s.cfHandle}</td>
                <td className="px-4 py-2">{s.currentRating}</td>
                <td className="px-4 py-2">{s.maxRating}</td>
                <td className="px-4 py-2">
                  {s.lastUpdated
                    ? new Date(s.lastUpdated).toLocaleDateString()
                    : '-'}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => nav(`/students/${s._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(s)}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(s._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
