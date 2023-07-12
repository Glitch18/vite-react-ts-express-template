import express from "express";
import path from "path";
import pkg from "sqlite3";

const { verbose } = pkg;
const sqlite3 = verbose();

const apiRouter = express.Router();

// Initialize your sqlite database
let db = new sqlite3.Database(
  path.join(__dirname, "../questionBank.db"),
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the questionBank database.");
  }
);

// API to fetch all subjects
apiRouter.get("/subjects", (req, res) => {
  db.all(
    'SELECT name FROM sqlite_master WHERE type="table"',
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    }
  );
});

// API to fetch all topics for a given subject
apiRouter.get("/subjects/:subjectId/topics", (req, res) => {
  const subjectId = req.params.subjectId;
  db.all(`SELECT DISTINCT Topic FROM ${subjectId}`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// API to fetch all questions for a given topic in a subject
apiRouter.get("/topics/:topicId/questions", (req, res) => {
  const topicId = req.params.topicId;
  const subjectId = req.query.subjectId;
  db.all(
    `SELECT * FROM ${subjectId} WHERE Topic = ?`,
    [topicId],
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    }
  );
});

export default apiRouter;
