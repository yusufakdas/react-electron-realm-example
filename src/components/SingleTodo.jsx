import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SingleTodoEditLayout from './SingleTodoEditLayout';

const SingleTodo = ({
  isChecked,
  label,
  editMode,
  isSaved,
  handleRemove,
  handleCheck,
}) => {
  return (
    <FormGroup>
      <SingleTodoEditLayout
        editMode={editMode}
        handleRemove={handleRemove}
      >
        <FormControlLabel
          control={
            <Checkbox
              onClick={handleCheck}
              checked={isChecked}
              color={isSaved && !editMode ? "default" : "primary"}
            />
          }
          label={label}
        />
      </SingleTodoEditLayout>
    </FormGroup >
  );
}

export default SingleTodo;
