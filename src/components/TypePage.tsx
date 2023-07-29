import React from "react";
import { Link, useParams } from "react-router-dom";

const SubjectPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center mt-10">{subjectId}</h1>
      <Link
        key="mcq"
        to={`/${subjectId}/mcq/topics`}
        style={{ display: "block", margin: "10px 0" }}
      >
        <button className="w-32 mt-4 bg-blue-500 text-white rounded text-xl p-5">
          MCQ
        </button>
      </Link>
      <Link
        key="saq"
        to={`/${subjectId}/saq/topics`}
        style={{ display: "block", margin: "10px 0" }}
      >
        <button className="w-32 mt-4 bg-blue-500 text-white rounded text-xl p-5">
          SAQ
        </button>
      </Link>
      <Link
        key="baq"
        to={`/${subjectId}/baq/topics`}
        style={{ display: "block", margin: "10px 0" }}
      >
        <button className="w-32 mt-4 bg-blue-500 text-white rounded text-xl p-5">
          BAQ
        </button>
      </Link>
      <Link
        key="laq"
        to={`/${subjectId}/laq/topics`}
        style={{ display: "block", margin: "10px 0" }}
      >
        <button className="w-32 mt-4 bg-blue-500 text-white rounded text-xl p-5">
          LAQ
        </button>
      </Link>
    </div>
  );
};

export default SubjectPage;
