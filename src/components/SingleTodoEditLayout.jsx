import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from "@mui/material/Stack";

const SingleTodoEditLayout = ({ editMode, handleRemove, children }) => {
  return (
    editMode ? (
      <Stack direction="row" spacing={1} >
        <IconButton size="small" onClick={handleRemove} >
          <RemoveIcon />
        </IconButton>
        {children}
      </Stack >
    ) : children
  );
}

export default SingleTodoEditLayout;
