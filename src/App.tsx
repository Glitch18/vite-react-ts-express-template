import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SubjectPage from "./components/SubjectPage";
import TopicPage from "./components/TopicPage";
import QuestionPage from "./components/QuestionPage";
import TypePage from "./components/TypePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectPage />} />
        <Route path="/:subjectId/types" element={<TypePage />} />
        <Route path="/:subjectId/:typeId/topics" element={<TopicPage />} />
        <Route
          path="/questions/:subjectId/:typeId/:topicId"
          element={<QuestionPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
