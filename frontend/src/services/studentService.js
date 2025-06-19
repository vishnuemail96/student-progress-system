import axios from "axios";

const API_URL = "http://localhost:5000/api/students"; // change based on your backend

const studentService = {
  getAll: () => axios.get(API_URL).then((res) => res.data),
  getById: (id) => axios.get(`${API_URL}/${id}`).then((res) => res.data),
  create: (data) => axios.post(API_URL, data).then((res) => res.data),
  update: (id, data) =>
    axios.put(`${API_URL}/${id}`, data).then((res) => res.data),
  remove: (id) => axios.delete(`${API_URL}/${id}`).then((res) => res.data),
};

const getById = async (id) => {
  const res = await axios.get(`/api/students/${id}`);
  return res.data;
};

export default studentService;
