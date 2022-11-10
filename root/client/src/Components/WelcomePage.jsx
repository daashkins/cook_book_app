import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function WelcomePage() {
    const navigate = useNavigate();

  return (
    <>
    <Typography variant="h1" component="h2">
      Welcome to Cook Book App!
    </Typography>
    <Button variant="contained" color="success" onClick={() => navigate("/create_recipe")}>
        Create a recipe
      </Button>
      <Button variant="contained" color="success" onClick={() => navigate("/recipes")}>
        View your recipes
      </Button>

    </>
  )
}

export default WelcomePage
