import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles'; 


const theme = createTheme();
theme.typography.h1 = {
  marginBottom: "10px",
  fontSize: '6rem',
  paddingLeft: "20px",
  paddingRight: "20px",
  '@media (max-width:600px)': {
    fontSize: '4rem',
  }
};

function WelcomePage() {
    const navigate = useNavigate();

  return (
    <div className='welcome'>
      <ThemeProvider theme={theme}>
    <Typography variant="h1" component="h2" align="center" color="white" >
      Welcome to Cook Book App!
    </Typography>
    <div className='controllers'>
    <Button variant="contained" style={{backgroundColor: "rgb(91 150 147)"}} className='controllers_button' onClick={() => navigate("/create_recipe")}>
        Create a recipe
      </Button>
      <Button variant="contained"  style={{backgroundColor: "rgb(91 150 147)"}} className="controllers_button" onClick={() => navigate("/recipes")}>
        View your recipes
      </Button>
      </div>
      </ThemeProvider>
    </div>
  )
}

export default WelcomePage
