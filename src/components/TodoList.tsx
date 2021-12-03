import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { ITask, TodoItem } from "./TodoItem";

export interface ITask {
  id: number;
  name: string;
  created: Date;
  due: Date;
  status: number;
}

interface TodoProps {
  todo: ITask;
}

export function TodoList(): JSX.Element {
  const baseUrl = "https://todo-app-davidculemann.herokuapp.com";

  // const [task, setTask] = useState<ITask | null>(null);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [enterName, setEnterName] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(new Date()); //Date | [Date | null, Date | null] | null
  const [showForm, setShowForm] = useState<boolean>(false);

  // async function handleGetTodo() {
  //   try {
  //     const response = await fetch(`${baseUrl}/todos/2`);
  //     const jsonData = await response.json();
  //     console.log(jsonData.data.todoById.rows[0]);
  //     setTask(jsonData.data.todoById.rows[0]);
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       console.error(err.message);
  //     }
  //   }
  // }

  const handleToggleStatus = async (id: number) => {
    axios.put(`${baseUrl}/todos/status/${id}`);
    setChecked(!checked);
  };

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

  useEffect(() => {
    handleGetAllTodos();
  }, [checked]);

  async function handlePostTask(newTask: Partial<ITask> | null) {
    axios.post(`${baseUrl}/todos`, newTask);
  }

  const handleShowForm = () => setShowForm(!showForm);

  function compileForm(name: string, due: Date): Partial<ITask> {
    const created = new Date();
    return { name: name, created: created, due: due };
  }

  function TodoItem(props: TodoProps): JSX.Element {
    return (
      <div className="todo">
        {props.todo.name} | {props.todo.status} | {props.todo.due} |{" "}
        <label>
          <input
            className="checkbox"
            type="checkbox"
            checked={props.todo.status === 0}
            onChange={() => handleToggleStatus(props.todo.id)}
          />
        </label>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleShowForm}>{showForm ? "-" : "+"}</button>
      <h1 className="header">To do tracker app</h1>
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
      <div>
        {todoList.map((todoE) => (
          <TodoItem todo={todoE} key={todoE.id} />
        ))}
      </div>
    </div>
  );
}
