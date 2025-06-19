import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Papa from "papaparse";
import studentService from "../services/studentService";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await studentService.getAll();
      setStudents(res);
    } catch (err) {
      toast.error("Failed to fetch students.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await studentService.remove(id);
      toast.success("Student deleted.");
      fetchStudents();
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(
      students.map((s, idx) => ({
        "#": idx + 1,
        Name: s.name,
        Email: s.email,
        Phone: s.phone,
        "Codeforces Handle": s.codeforcesHandle,
        "Current Rating": s.currentRating,
        "Max Rating": s.maxRating,
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `students_list.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = students.filter((s) =>
    [s.name, s.email, s.codeforcesHandle]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Students</h1>
        <div className="space-x-2">
          <Link to="/add" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add Student
          </Link>
          <button onClick={downloadCSV} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Download CSV
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or CF handle..."
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto text-sm text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">CF Handle</th>
              <th className="px-4 py-2">Current Rating</th>
              <th className="px-4 py-2">Max Rating</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, idx) => (
              <tr key={s._id} className="border-b">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.phone}</td>
                <td className="px-4 py-2">{s.codeforcesHandle}</td>
                <td className="px-4 py-2">{s.currentRating}</td>
                <td className="px-4 py-2">{s.maxRating}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link to={`/students/${s._id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                  <Link to={`/edit/${s._id}`} className="text-yellow-600 hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentListPage;
