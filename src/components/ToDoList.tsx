import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ITask, toDoLister } from "./toDoLister";

export function ToDoList(): JSX.Element {
  const baseUrl = "https://todo-app-davidculemann.herokuapp.com";

  const [task, setTask] = useState<ITask | null>(null);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [enterName, setEnterName] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>(new Date()); //Date | [Date | null, Date | null] | null
  const [showForm, setShowForm] = useState<boolean>(false);

  async function handleGetTodo() {
    try {
      const response = await fetch(`${baseUrl}/todos/2`);
      const jsonData = await response.json();
      console.log(jsonData.data.todoById.rows[0]);
      setTask(jsonData.data.todoById.rows[0]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  async function handleGetAllTodos() {
    try {
      const response = await fetch(`${baseUrl}/todos`);
      const jsonData = await response.json();
      console.log(jsonData.data.todos); //array of todo objects
      setTodoList(jsonData.data.todos);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  async function handlePostTask(newTask: Partial<ITask> | null) {
    axios.post(`${baseUrl}/todos`, newTask);
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
      <button onClick={handleGetTodo}>load a todo</button>
      <button onClick={handleGetAllTodos}>load all todos</button>

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
      {todoList.map((e) => toDoLister(e))}
    </div>
  );
}
