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
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { subjectId, typeId, topicId } = useParams<{
    subjectId: string;
    typeId: string;
    topicId: string;
  }>();

  useEffect(() => {
    fetch(`/api/questions/${subjectId}/${typeId}/${topicId}`)
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, [topicId, subjectId, typeId]);

  const isCorrectAnswer = (answer: string) => {
    if (selectedAnswer === "") return false;
    let correctAns;
    if (
      ["A", "B", "C", "D"].includes(
        questions[currentQuestionIndex].CorrectAnswer
      )
    ) {
      switch (questions[currentQuestionIndex].CorrectAnswer) {
        case "A":
          correctAns = questions[currentQuestionIndex].Answer1;
          break;
        case "B":
          correctAns = questions[currentQuestionIndex].Answer2;
          break;
        case "C":
          correctAns = questions[currentQuestionIndex].Answer3;
          break;
        case "D":
          correctAns = questions[currentQuestionIndex].Answer4;
          break;
      }
    } else {
      correctAns = questions[currentQuestionIndex].CorrectAnswer;
    }
    return answer === correctAns;
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer("");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    }
  };

  const handleJumpTo = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setCurrentQuestionIndex(-1);
      setSelectedAnswer("");
    } else {
      const index = parseInt(inputValue) - 1;
      if (index >= 0 && index < questions.length) {
        setCurrentQuestionIndex(index);
        setSelectedAnswer("");
      }
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const question =
    questions[currentQuestionIndex === -1 ? 0 : currentQuestionIndex];

  return (
    <div>
      <Link to="/">
        <button className="w-auto mt-4 bg-blue-500 text-white rounded text-xl p-5">
          Home
        </button>
      </Link>
      <div className="flex flex-col items-center">
        <h2 className="text-xl">{question.Question}</h2>
        {typeId === "mcq" && (
          <div className="flex flex-col items-center">
            <button
              key="1"
              className={`w-auto mt-3 ${
                isCorrectAnswer(question.Answer1)
                  ? "bg-green-500"
                  : selectedAnswer === question.Answer1
                  ? "bg-red-500"
                  : "bg-amber-600"
              }  text-white rounded text-l p-5`}
              onClick={() => setSelectedAnswer(question.Answer1)}
            >
              {question.Answer1}
            </button>
            <button
              key="2"
              className={`w-auto mt-3 ${
                isCorrectAnswer(question.Answer2)
                  ? "bg-green-500"
                  : selectedAnswer === question.Answer2
                  ? "bg-red-500"
                  : "bg-amber-600"
              }  text-white rounded text-l p-5`}
              onClick={() => setSelectedAnswer(question.Answer2)}
            >
              {question.Answer2}
            </button>
            <button
              key="3"
              className={`w-auto mt-3 ${
                isCorrectAnswer(question.Answer3)
                  ? "bg-green-500"
                  : selectedAnswer === question.Answer3
                  ? "bg-red-500"
                  : "bg-amber-600"
              }  text-white rounded text-l p-5`}
              onClick={() => setSelectedAnswer(question.Answer3)}
            >
              {question.Answer3}
            </button>
            <button
              key="4"
              className={`w-auto mt-3 ${
                isCorrectAnswer(question.Answer4)
                  ? "bg-green-500"
                  : selectedAnswer === question.Answer4
                  ? "bg-red-500"
                  : "bg-amber-600"
              }  text-white rounded text-l p-5`}
              onClick={() => setSelectedAnswer(question.Answer4)}
            >
              {question.Answer4}
            </button>
          </div>
        )}
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
            className="text-black mr-1"
            value={
              currentQuestionIndex === -1 ? "" : `${currentQuestionIndex + 1}`
            }
          />
          Of {questions.length}
        </div>
        <button
          onClick={handleNext}
          className="w-auto mt-3 bg-blue-900 text-white rounded text-l p-5"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
