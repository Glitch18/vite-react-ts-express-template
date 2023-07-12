import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const TopicPage: React.FC = () => {
  const [topics, setTopics] = useState<{ Topic: string }[]>([]);
  const { subjectId } = useParams<{ subjectId: string }>();
  const location = useLocation();

  useEffect(() => {
    fetch(`/api/subjects/${subjectId}/topics`)
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }, [subjectId, location]);

  return (
    <div>
      <Link to="/">
        <button className="w-auto mt-4 bg-blue-500 text-white rounded text-xl p-5">
          Back
        </button>
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-center mt-10">{subjectId}</h1>
        {topics.map((topic: any) => (
          <Link
            to={`/questions/${subjectId}/topics/${topic.Topic}`}
            key={topic.Topic}
          >
            <button className="w-auto mt-4 bg-red-500 text-white rounded text-xl p-5">
              {topic.Topic}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicPage;
