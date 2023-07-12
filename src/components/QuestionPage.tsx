import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Question {
  Question: string;
  Topic: string;
  Answer1: string;
  Answer2: string;
  Answer3: string;
  Answer4: string;
  CorrectAnswer: string;
}

const QuestionPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const { subjectId, topicId } = useParams<{
    subjectId: string;
    topicId: string;
  }>();

  useEffect(() => {
    fetch(`/api/topics/${topicId}/questions?subjectId=${subjectId}`)
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, [topicId]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswered(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
    }
  };

  const handleJumpTo = (event: any) => {
    const index = event.target.value - 1;
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      setIsAnswered(false);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const question = questions[currentQuestionIndex];

  return (
    <div>
      <Link to="/">
        <button className="w-auto mt-4 bg-blue-500 text-white rounded text-xl p-5">
          Back
        </button>
      </Link>
      <div className="flex flex-col items-center">
        <h2 className="text-xl">{question.Question}</h2>
        <button
          key="1"
          className="w-auto mt-3 bg-amber-900 text-white rounded text-l p-5"
          onClick={() => setIsAnswered(true)}
        >
          {question.Answer1}
        </button>
        <button
          key="2"
          className="w-auto mt-3 bg-amber-900 text-white rounded text-l p-5"
          onClick={() => setIsAnswered(true)}
        >
          {question.Answer2}
        </button>
        <button
          key="3"
          className="w-auto mt-3 bg-amber-900 text-white rounded text-l p-5"
          onClick={() => setIsAnswered(true)}
        >
          {question.Answer3}
        </button>
        <button
          key="4"
          className="w-auto mt-3 bg-amber-900 text-white rounded text-l p-5"
          onClick={() => setIsAnswered(true)}
        >
          {question.Answer4}
        </button>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <button
          onClick={handlePrevious}
          className="w-auto mt-3 bg-blue-900 text-white rounded text-l p-5"
        >
          Previous
        </button>
        <div className="flex flex-row items-center justify-center">
          <input
            type="number"
            min="1"
            max={questions.length}
            onChange={handleJumpTo}
            className="text-black"
          />
          <button onClick={() => handleJumpTo(currentQuestionIndex)}>
            Jump to
          </button>
        </div>
        <button
          onClick={handleNext}
          className="w-auto mt-3 bg-blue-900 text-white rounded text-l p-5"
        >
          Next
        </button>
      </div>
      {isAnswered && (
        <div>
          <h3>Correct Answer: {question.CorrectAnswer}</h3>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
