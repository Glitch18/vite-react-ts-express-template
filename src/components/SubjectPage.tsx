import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SubjectPage: React.FC = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch("/api/subjects")
      .then((response) => response.json())
      .then((data) => setSubjects(data));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center mt-10">Manu's EQB</h1>
      {subjects.map((subject: any) => (
        <Link
          key={subject.name}
          to={`/${subject.name}/types`}
          style={{ display: "block", margin: "10px 0" }}
        >
          <button className="w-32 mt-4 bg-blue-500 text-white rounded text-xl p-5">
            {subject.name}
          </button>
        </Link>
      ))}
      <p className="mt-1"> Made with Love 💕 by Atharva </p>
    </div>
  );
};

export default SubjectPage;
