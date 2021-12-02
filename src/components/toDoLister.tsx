export interface ITask {
  id: number;
  name: string;
  created: Date;
  due: Date;
  status: number;
}

export function toDoLister(listprops: ITask): JSX.Element {
  return (
    <div>
      {listprops.name} | {listprops.status} | {listprops.due}
    </div>
  );
}
