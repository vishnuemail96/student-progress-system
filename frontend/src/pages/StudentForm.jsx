import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import studentService from "../services/studentService";

const initialState = {
  name: "",
  email: "",
  phone: "",
  codeforcesHandle: "",
};

const StudentForm = () => {
  const [student, setStudent] = useState(initialState);
  const { id } = useParams(); // If ID exists, it's edit mode
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const fetchStudent = async () => {
    try {
      const res = await studentService.getById(id);
      setStudent(res);
    } catch (err) {
      toast.error("Failed to fetch student data.");
    }
  };

  useEffect(() => {
    if (isEdit) fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await studentService.update(id, student);
        toast.success("Student updated successfully.");
      } else {
        await studentService.create(student);
        toast.success("Student added successfully.");
      }
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phone", "codeforcesHandle"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field.replace("codeforcesHandle", "Codeforces Handle")}</label>
            <input
              type="text"
              name={field}
              value={student[field]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Add"} Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
