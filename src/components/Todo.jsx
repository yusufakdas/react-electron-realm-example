import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import TaskAdd from './TaskAdd';
import TodoList from './TodoList';


const Todo = ({ repository }) => {
  const [todoList, setTodoList] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const data = repository.readAll().map((task) => ({
        ...task,
        isDone: task.isChecked,
      }));
      setTodoList(data);
    }
    return () => {
      mounted = false;
    }
  }, [repository]);

  const addTask = (textData) => {
    console.log(`Add new item: ${textData}`);
    const createdId = repository.create(textData, false);
    setTodoList([
      ...todoList, {
        _id: createdId,
        text: textData,
        isChecked: false,
        isDone: false,
      }
    ]);
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleDone = () => {
    const newTodoList = [...todoList];
    for (let i = 0; i < newTodoList.length; ++i) {
      let task = newTodoList[i];
      repository.update(task._id, task.isChecked);
      newTodoList[i].isDone = task.isChecked;
    }
    setTodoList(newTodoList);
  }

  const handleRemove = (index) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);

    // Get ID and delete data from db.
    const id = todoList[index]._id;
    repository.delete(id);
  }

  const handleCheck = (index) => {
    const newTodoList = [...todoList];
    const isChecked = newTodoList[index].isChecked;
    newTodoList[index].isChecked = !isChecked;
    setTodoList(newTodoList);
  }

  return (
    <Paper elevation={4}>
      <Typography variant="h4" component="h4">
        To-Do List
      </Typography >
      <Divider />

      <TaskAdd addTask={addTask} />
      <Divider />

      <TodoList
        todoData={todoList}
        editMode={editMode}
        handleRemove={handleRemove}
        handleCheck={handleCheck}
      />
      <Divider />

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={toggleEditMode}
        >
          Toggle Edit Mode
        </Button>
        <Button
          variant="contained"
          onClick={handleDone}
        >
          Save
        </Button>
      </Stack>
    </Paper>
  );
}

export default Todo;
