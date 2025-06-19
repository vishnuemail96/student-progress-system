import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import studentService from "../services/studentService";
import axios from "axios";
import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratingHistory, setRatingHistory] = useState([]);
  const [timeRange, setTimeRange] = useState("all"); // "30", "90", "365", "all"

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await studentService.getById(id);
        setStudent(data);

        const codeforcesUsername = data.codeforcesHandle;
        if (codeforcesUsername) {
          const res = await axios.get(
            `https://codeforces.com/api/user.rating?handle=${codeforcesUsername}`
          );
          if (res.data.status === "OK" && Array.isArray(res.data.result)) {
            setRatingHistory(res.data.result);
          } else {
            toast.error("Unable to fetch Codeforces rating history.");
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load student details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const downloadCSV = () => {
    if (!filteredRatings.length) return;

    const headers = ["S.No", "Contest Name", "Old Rating", "New Rating", "Rank"];
    const rows = filteredRatings.map((entry, index) => [
      index + 1,
      entry.contestName,
      entry.oldRating,
      entry.newRating,
      entry.rank,
    ]);

    const csvContent =
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${student.name}_rating_history.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 🕒 Filter data by time range
  const getFilteredRatings = () => {
    if (timeRange === "all") return ratingHistory;

    const now = Date.now();
    const days = parseInt(timeRange, 10);
    const cutoff = now - days * 24 * 60 * 60 * 1000;

    return ratingHistory.filter((entry) => entry.ratingUpdateTimeSeconds * 1000 >= cutoff);
  };

  const filteredRatings = getFilteredRatings();

  const chartData = {
    labels: filteredRatings.map((entry) => entry.contestName),
    datasets: [
      {
        label: "Rating",
        data: filteredRatings.map((entry) => entry.newRating),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.2,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 60,
          minRotation: 30,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
    },
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!student) return <p className="text-center mt-10 text-red-500">Student not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{student.name}</h1>
      <p className="text-gray-600 mb-6">Codeforces Handle: {student.codeforcesHandle}</p>

      {ratingHistory.length > 0 ? (
        <>
          {/* ⏱ Time Filter */}
          <div className="mb-4">
            <span className="mr-2 font-medium">Filter by:</span>
            {["30", "90", "365", "all"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 border rounded mr-2 ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black hover:bg-blue-100"
                }`}
              >
                {range === "all" ? "All Time" : `${range} Days`}
              </button>
            ))}
          </div>

          <div className="mb-6 bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Rating Progress</h2>
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="mb-6 bg-white shadow rounded p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Contest Rating History</h2>
              <button
                onClick={downloadCSV}
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Download CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 border">S.No</th>
                    <th className="px-3 py-2 border">Contest</th>
                    <th className="px-3 py-2 border">Old Rating</th>
                    <th className="px-3 py-2 border">New Rating</th>
                    <th className="px-3 py-2 border">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRatings.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border">{idx + 1}</td>
                      <td className="px-3 py-2 border">{entry.contestName}</td>
                      <td className="px-3 py-2 border">{entry.oldRating}</td>
                      <td className="px-3 py-2 border">{entry.newRating}</td>
                      <td className="px-3 py-2 border">{entry.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No rating history available.</p>
      )}
    </div>
  );
};

export default StudentDetailPage;
