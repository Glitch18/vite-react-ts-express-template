import express from "express";
import path from "path";
import apiRouter from "./api";
import cors from "cors";
import bodyParser from "body-parser";

const port = process.env.PORT ? +process.env.PORT : 8080;
const dev = process.argv[2] === "dev";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", apiRouter);

if (dev) {
  console.log("DEVELOPMENT MODE");
} else {
  console.log("PRODUCTION MODE");
  app.use(express.static(path.join(__dirname, "../../dist")));
}

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
