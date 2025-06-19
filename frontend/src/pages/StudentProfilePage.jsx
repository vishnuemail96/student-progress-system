import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import studentService from '../services/studentService';
import codeforcesService from '../services/codeforcesService';

const StudentProfilePage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [contests, setContests] = useState([]);
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await studentService.getById(id);
      setStudent(data);

      if (data.cfHandle) {
        const contestData = await codeforcesService.getContests(data.cfHandle);
        const solvedData = await codeforcesService.getSolved(data.cfHandle);
        setContests(contestData);
        setSolvedCount(solvedData.solvedCount);
      }
    };
    fetchDetails();
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{student.name}</h2>
      <p>Email: {student.email}</p>
      <p>Phone: {student.phone}</p>
      <p>CF Handle: {student.cfHandle}</p>
      <p>Current Rating: {student.currentRating}</p>
      <p>Max Rating: {student.maxRating}</p>
      <p>Problems Solved: {solvedCount}</p>

      <h3 className="text-lg mt-4 font-semibold">Contest History:</h3>
      <ul className="list-disc ml-5">
        {contests.slice(-5).reverse().map((c, i) => (
          <li key={i}>
            Contest ID: {c.contestId}, Old: {c.oldRating}, New: {c.newRating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentProfilePage;
