import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import StudentTable from "../components/StudentTable";
import studentService from "../services/studentService";

const StudentTablePage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    codeforcesHandle: "",
  });

  const load = async () => {
    setLoading(true);
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      toast.error("Failed to load students");
    }
    setLoading(false);
  };

  const deleteOne = async (id) => {
    if (confirm("Delete this student?")) {
      try {
        await studentService.remove(id);
        toast.success("Student deleted");
        load();
      } catch {
        toast.error("Failed to delete");
      }
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      codeforcesHandle: student.codeforcesHandle,
    });
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const updated = await studentService.update(editingStudent._id, formData);
      setStudents((prev) =>
        prev.map((s) => (s._id === updated._id ? updated : s))
      );
      setEditingStudent(null);
      toast.success("Student updated");
    } catch {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "CF Handle", key: "cfHandle" },
    { label: "Current Rating", key: "currentRating" },
    { label: "Max Rating", key: "maxRating" },
    { label: "Last Updated", key: "lastUpdated" },
  ];

  const csvData = students.map((s) => ({
    ...s,
    lastUpdated: s.lastUpdated ? new Date(s.lastUpdated).toLocaleString() : "",
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Students</h1>

      <div className="flex justify-end">
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={`students_${Date.now()}.csv`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download CSV
        </CSVLink>
      </div>

      <StudentTable
        students={students}
        onDelete={deleteOne}
        onEdit={handleEditClick}
        loading={loading}
      />

      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
            <form onSubmit={handleUpdateStudent}>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Phone"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                value={formData.codeforcesHandle}
                onChange={(e) =>
                  setFormData({ ...formData, codeforcesHandle: e.target.value })
                }
                placeholder="Codeforces Handle"
                className="w-full mb-2 p-2 border rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTablePage;
