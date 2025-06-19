import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layouts/Layout";
import Codeforcescheckerpage from "./pages/CodeforcesCheckerPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import StudentForm from "./pages/StudentForm"; // Assuming StudentForm exists
import StudentListPage from "./pages/StudentListPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import StudentTablePage from "./pages/StudentTablePage"

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/codeforces" element={<Codeforcescheckerpage />} />
            <Route path="/students/:id" element={<StudentDetailPage />} />
            <Route path="/add" element={<StudentForm />} />
            <Route path="/" element={<StudentListPage />} />
            <Route path="/students/" element={<StudentProfilePage />} />
            <Route path="/edit/:id" element={<StudentForm />} />
            <Route path="/students" element={<StudentTablePage/>}/>
          </Routes>
        </Layout>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  )
}

export default App;
