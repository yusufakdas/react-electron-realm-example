import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const TaskAdd = ({ addTask }) => {
  const [textData, setTextState] = useState('');

  const handleTextChange = (event) => {
    event.preventDefault();
    setTextState(event.target.value);
  }

  const handleTodoAdd = () => {
    if (textData.length > 0) {
      setTextState(() => {
        addTask(textData);
        return '';
      });
    }
  }

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Add a new task"
        variant="outlined"
        onChange={handleTextChange}
        value={textData}
      />
      <IconButton
        color="primary"
        component="label"
        size="large"
        onClick={handleTodoAdd}
      >
        <AddIcon />
      </IconButton>
    </>
  );
}

export default TaskAdd;