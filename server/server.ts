import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";

const app = express();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());
app.use(cors());
dotenv.config();

const PORT_NUMBER = process.env.PORT ?? 4000;

//===================ROUTES==========================

// app.get("/", (req, res) => {
//   const pathToFile = filePath("../public/index.html");
//   res.sendFile(pathToFile);
// });

// GET /items
app.get("/todos", async (req, res) => {
  try {
    console.log(req.body)
  } catch (err) {
    console.error(err.message)
  }
});

// POST /items
// app.post<{}, {}, Task>("/todos", async (req, res) => {
//   // to be rigorous, ought to handle non-conforming request bodies
//   // ... but omitting this as a simplification
//   const postData = req.body;
//   const createdSignature = addTask(postData);
//   res.status(201).json(createdSignature);
// });

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
