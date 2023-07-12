import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SubjectPage from "./components/SubjectPage";
import TopicPage from "./components/TopicPage";
import QuestionPage from "./components/QuestionPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectPage />} />
        <Route path="/:subjectId/topics" element={<TopicPage />} />
        <Route
          path="/questions/:subjectId/topics/:topicId"
          element={<QuestionPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
