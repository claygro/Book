import express from "express";
import connection from "./models/index.models.js";
import bookRouter from "./routes/book.routes.js";
import "dotenv/config";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use("/book", bookRouter);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("backend is working");
});
app.listen(process.env.PORT || 8000, async () => {
  try {
    await connection.authenticate();
    await connection.sync();
    console.log("server has been started");
  } catch (error) {
    console.log(`error in starting server ${error}`);
  }
});
