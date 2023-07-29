import express from "express";
import path from "path";
import pkg from "sqlite3";

const { verbose } = pkg;
const sqlite3 = verbose();

const apiRouter = express.Router();

// Initialize your sqlite database
const db = new sqlite3.Database(
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
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '%X'",
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
apiRouter.get("/topics/:subjectId/:typeId/", (req, res) => {
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;
  let query;

  if (typeId !== "mcq") {
    query = `SELECT DISTINCT Topic FROM ${subjectId.concat(
      "X"
    )} WHERE Type = "${typeId.toUpperCase()}"`;
  } else query = `SELECT DISTINCT Topic FROM ${subjectId}`;

  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// API to fetch all questions for a given topic in a subject
apiRouter.get("/questions/:subjectId/:typeId/:topicId", (req, res) => {
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;
  const topicId = req.params.topicId;
  let query;
  let queryParams;
  if (typeId !== "mcq") {
    query = `SELECT * FROM ${subjectId.concat(
      "X"
    )} WHERE Topic = ? AND Type = ?`;
    queryParams = [topicId, typeId.toUpperCase()];
  } else {
    query = `SELECT * FROM ${subjectId} WHERE Topic = ?`;
    queryParams = [topicId];
  }

  db.all(query, queryParams, (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

export default apiRouter;
