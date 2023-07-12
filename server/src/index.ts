import express from "express";
import path from "path";

const port = process.env.PORT ? +process.env.PORT : 8080;
const dev = process.argv[2] === "dev";

if (dev) {
  console.log("DEVELOPMENT MODE");
  const app = express();
  app.use(express.json());

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
} else {
  console.log("PRODUCTION MODE");
  const app = express();
  app.use(express.static(path.join(__dirname, "../../dist")));
  app.use(express.json());

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}
