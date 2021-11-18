import { useState } from "react";
import axios from "axios";

export function ToDoList(): JSX.Element {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://to-do-list-davidculemann.herokuapp.com"
      : "http://localhost:4000";

  interface ITask {
    name: string;
    created: Date;
    due: Date;
    completed: number;
  }

  const [task, setTask] = useState<ITask | null>(null);
  const [showForm, setShowForm] = useState<number>(0);
  const [newTask, setNewTask] = useState<ITask | null>(null);

  async function handleGetTask() {
    fetch(`${baseUrl}/items/20`) //or "http://localhost:4000/items/"
      .then((response) => response.json())
      .then((jsonBody: ITask) => setTask(jsonBody));
  }

  async function handlePostTask(newTask: Partial<ITask> | null) {
    axios.post(`${baseUrl}/items`, newTask);
  }

  const handleShowForm = () => (showForm ? setShowForm(0) : setShowForm(1));

  return (
    <div>
      <button onClick={handleShowForm}>{showForm ? "-" : "+"}</button>
      <h1>Tasks will go here</h1>
      <button onClick={handleGetTask}>load a task</button>

      {/* Make the form submittable by a button or enter, add a date selector, and make the form stitch up all data into a task.json (helper function) which is then posted*/}
      {showForm > 0 && (
        <form>
          <input
            type="object"
            onChange={(e) => {
              setNewTask(JSON.parse(e.target.value));
            }}
            placeholder="enter json task"
          ></input>

          <button onClick={() => handlePostTask(newTask)}>create a task</button>
        </form>
      )}
      {task && <p>{task.name} is the task</p>}
    </div>
  );
}
