import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function ToDoList(): JSX.Element {
  const baseUrl = "https://todo-app-davidculemann.herokuapp.com";

  interface ITask {
    id: number;
    name: string;
    created: Date;
    due: Date;
    status: number;
  }

  const [task, setTask] = useState<ITask | null>(null);
  const [enterName, setEnterName] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>(new Date()); //Date | [Date | null, Date | null] | null
  const [showForm, setShowForm] = useState<boolean>(false);

  async function handleGetTask() {
    // try {
    const response = await fetch(`${baseUrl}/todos/1`);
    const jsonData = await response.json();
    setTask(jsonData);

    //   } catch (error: unknown) {
    //     console.log(error.message)
    //   }
  }

  async function handlePostTask(newTask: Partial<ITask> | null) {
    axios.post(`${baseUrl}/items`, newTask);
  }

  const handleShowForm = () => setShowForm(!showForm);

  function compileForm(name: string, due: Date): Partial<ITask> {
    const created = new Date();
    return { name: name, created: created, due: due };
  }

  return (
    <div>
      <button onClick={handleShowForm}>{showForm ? "-" : "+"}</button>
      <h1>To do tracker app</h1>
      <button onClick={handleGetTask}>load a task</button>

      {/* Make the form submittable by a button or enter, add a date selector, and make the form stitch up all data into a task.json (helper function) which is then posted*/}
      {showForm && (
        <form>
          <input
            type="object"
            onChange={(e) => {
              setEnterName(e.target.value);
            }}
            placeholder="enter task name"
          ></input>

          <DatePicker
            selected={dueDate}
            onChange={(date: Date | null) => date && setDueDate(date)}
          />

          <button
            onClick={() => handlePostTask(compileForm(enterName, dueDate))}
          >
            create a task
          </button>
        </form>
      )}
      {task && <p>{task.name} is the task</p>}
    </div>
  );
}
