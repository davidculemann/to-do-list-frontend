export interface ITask {
  id: number;
  name: string;
  created: Date;
  due: Date;
  status: number;
}

interface TodoProps {
  todo: Partial<ITask>;
}

export function ToDoLister(props: TodoProps): JSX.Element {
  return (
    <div className="todo">
      {props.todo.name} | {props.todo.status} | {props.todo.due}
    </div>
  );
}
