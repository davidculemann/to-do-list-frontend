import { useState } from "react";
import { TodoList } from "./TodoList";

export function TodoApp(): JSX.Element {
  const [statusFilter, setStatusFilter] = useState<boolean>(true);

  const handleToggleStatus = async () => {
    setStatusFilter(!statusFilter);
  };

  return (
    <div>
      <h1 className="header">To do tracker</h1>
      <div className="controls">
        <button onClick={handleToggleStatus}>
          {statusFilter ? "Hide completed" : "Show completed"}
        </button>
      </div>
      <TodoList status={statusFilter} />
    </div>
  );
}
