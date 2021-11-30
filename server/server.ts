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

export interface Task {
  name: string;
  due: Date;
}

//===================ROUTES==========================

// app.get("/", (req, res) => {
//   const pathToFile = filePath("../public/index.html");
//   res.sendFile(pathToFile);
// });

// GET /items
app.get("/todos", async (req, res) => {
  try {
    const allToDos = await client.query("SELECT * FROM todos");
    res.json(allToDos.rows)
  } catch (error) {
    console.error(error.message)
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id
    const toDoById = await client.query("SELECT * FROM todos WHERE id = $1", [todoId]);
    res.json(toDoById.rows)
  } catch (error) {
    console.error(error.message)
  }
});

// POST /items
app.post<{}, {}, Task>("/todos", async (req, res) => {
  try {
    const postData = req.body;
    console.log(postData)
  }
  catch (error) {
    console.error(error.message)
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
