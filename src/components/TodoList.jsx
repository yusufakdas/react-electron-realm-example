import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import SingleTodo from "./SingleTodo";

function divideTodoIndexesByDone(todoData) {
  const notDoneIndexes = [];
  const doneIndexes = [];

  for (let i = 0; i < todoData.length; ++i) {
    const task = todoData[i];
    if (task.isDone) {
      doneIndexes.push(i);
    } else {
      notDoneIndexes.push(i);
    }
  }
  return [notDoneIndexes, doneIndexes];
}

const TodoList = ({
  todoData,
  editMode,
  handleRemove,
  handleCheck,
}) => {
  const [notDoneIndexes, doneIndexes] = divideTodoIndexesByDone(todoData);

  return (
    <>
      {(notDoneIndexes.length > 0 && doneIndexes.length > 0) &&
        <Typography variant="h5" component="h5">TODO</Typography>
      }

      {notDoneIndexes.map((idx) => (
        <SingleTodo
          isChecked={todoData[idx].isChecked}
          label={todoData[idx].text}
          key={`${todoData[idx].text}${todoData[idx]._id}`}
          editMode={editMode}
          isSaved={todoData[idx].isDone}
          handleRemove={() => handleRemove(idx)}
          handleCheck={() => handleCheck(idx)}
        />)
      )}

      {(notDoneIndexes.length > 0 && doneIndexes.length > 0) &&
        <>
          <Divider />
          <Typography variant="h5" component="h5">DONE</Typography>
        </>
      }

      {doneIndexes.map((idx) => (
        <SingleTodo
          isChecked={todoData[idx].isChecked}
          label={todoData[idx].text}
          key={`${todoData[idx].text}${todoData[idx]._id}`}
          editMode={editMode}
          isSaved={todoData[idx].isDone}
          handleRemove={() => {
            if (editMode) {
              handleRemove(idx);
            }
          }}
          handleCheck={() => {
            if (editMode) {
              handleCheck(idx);
            }
          }}
        />)
      )}
    </>
  );
}

export default TodoList;
