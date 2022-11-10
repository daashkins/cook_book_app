
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function CreateRecipe() {
  return (
    <Box
    component="form"
    sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
    noValidate
    autoComplete="off"
  >
    <TextField id="outlined-basic" label="Title" variant="outlined" />
    <TextField id="outlined-basic" label="Ingredients" variant="outlined" />
    <TextField id="outlined-basic" label="Instructions" variant="outlined" />
  </Box>
  )
}

export default CreateRecipe
