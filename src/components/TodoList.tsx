import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

interface ListProps {
  status: boolean;
}

export function TodoList(props: ListProps): JSX.Element {
  const baseUrl = "https://todo-app-davidculemann.herokuapp.com";

  // const [task, setTask] = useState<ITask | null>(null);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [enterName, setEnterName] = useState<string>("");
  const [queRender, setQueRender] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [showForm, setShowForm] = useState<boolean>(false);

  const todosToShow = todoList.filter(
    (e) => e.status === 1 || (e.status === 0 && props.status === true)
  );

  const handleToggleStatus = async (id: number) => {
    await axios.put(`${baseUrl}/todos/status/${id}`);
    setQueRender(!queRender);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${baseUrl}/todos/${id}`);
    setQueRender(!queRender);
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
  }, [queRender]);

  async function handlePostTask(newTask: Partial<ITask> | null) {
    await axios.post(`${baseUrl}/todos`, newTask);
    setQueRender(!queRender);
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
        </label>{" "}
        |{" "}
        {/* <BsTrashFill
          className="trashIcon"
          onClick={() => handleDelete(props.todo.id)}
        /> */}
        <div className="trash-box" onClick={() => handleDelete(props.todo.id)}>
          <div className="trash"></div>
          <div className="trash-top"></div>
          <div className="trash-btm">
            <div className="trash-lines">
              <div className="trash-line"></div>
              <div className="trash-line"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleShowForm}>{showForm ? "-" : "+"}</button>
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
        {todosToShow.map((todoE) => (
          <TodoItem todo={todoE} key={todoE.id} />
        ))}
      </div>
    </div>
  );
}
