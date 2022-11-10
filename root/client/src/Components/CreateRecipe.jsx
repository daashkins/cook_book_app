
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useEffect } from 'react';

const validate = (data) => {
  if( data.title && data.category && data.instructions && data.ingredients.length >= 1 ) {
    return data;
  }
}
function CreateRecipe() {
const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
const [category, setCategory] = useState('');
const [title, setTitle] = useState('');
const [instructions, setInstructions] = useState('');

const [newRecipe, setNewRecipe] = useState({});

const handleChangeCategory = (e) => {
    setCategory(e.target.value);
};

const removeIngredients = (index) => {
    let data = [...ingredients];
    data.splice(index, 1)
    setIngredients(data)
}
const handleIngredientsChange = (index, e) => {
    let data = [...ingredients];
    data[index][e.target.name] = e.target.value;
    setIngredients(data);
 }

const handleCreateNewRecipe =  (e) => {
    e.preventDefault();
    const obj= {
        title: title,
        category: category,
        ingredients: [...ingredients],
        instructions: instructions
    };
    
    setNewRecipe(newRecipe => ({
        ...newRecipe,
        ...obj
   }));
   setTitle('');
   setIngredients([{ name: '', quantity: '' }]);
   setCategory('');
   setInstructions('');
}

useEffect(() => {
  const data = validate(newRecipe);
  if(data) {    
    fetch("http://localhost:8080/recipes", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(newRecipe),
    })
    .then(response => {
        console.log(response);
        response.json()})
    }
  },[newRecipe])


  return (
    <Box
    component="form"
    sx={{'& > :not(style)': { m: 1, width: '100ch' },}}
    noValidate
    autoComplete="off"
    onSubmit={(e)=> handleCreateNewRecipe(e)}
  >
    <TextField id="outlined-basic" type="text" value={title} required label="Title" variant="outlined" onChange={(e) => setTitle(e.target.value)}/>
    <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChangeCategory}
          required
        >
          <MenuItem value={10}>Breakfast</MenuItem>
          <MenuItem value={20}>Lunch</MenuItem>
          <MenuItem value={30}>Dinner</MenuItem>
        </Select>
    {ingredients.map((item, index) => {
        return (
        <div key={index}>
        <TextField id={"name"+index} type="text"label="Ingredient" name="name"  value={item.name || ''} variant="outlined" required onChange={(e) => handleIngredientsChange(index, e)} />
        <TextField id={"quantity"+index} label="Quantity" name="quantity" value={item.quantity || ''}  variant="outlined" required onChange={(e) => handleIngredientsChange(index, e)}/>
        <Button variant="outlined" startIcon={<DeleteIcon/>} onClick={() => removeIngredients(index)} />
        </div>
     )
    })}
    

    <Button variant="contained" onClick={() => setIngredients([...ingredients, { name: '', amount: '' }])}>Add ingredient</Button>
    <TextField id="outlined-basic" type="text" value={instructions} required label="Instructions" variant="outlined" onChange={(e) => setInstructions(e.target.value)} />

    <Button variant="contained" type="submit" label="Create recipe" >Create recipe</Button>
  </Box>
  )
}

export default CreateRecipe
