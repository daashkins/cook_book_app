import React, { useState } from 'react'
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Delete from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function Recipes() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (id, e) => {
    fetch(`http://localhost:8080/recipes/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {"Content-Type": 'application/json'},
  }).then(() =>{
    fetch("http://localhost:8080/recipes", {
      method: "GET",
      mode: "cors",
      headers: {"Content-Type": 'application/json'},
  })
  .then(response =>response.json())
  .then(data => setRecipes(data)); 
  } );
    
  };

const [recipes, setRecipes] = useState([]);


useEffect(() => {
  fetch("http://localhost:8080/recipes", {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": 'application/json'},
    })
    .then(response =>response.json())
    .then(data => setRecipes(data));
},[])
  return (
    <div className='recipe_list'>
      {recipes.map((recipe, index) => {
        return (
          <Card className='recipe_item'key={index} sx={{ minWidth: 270 }}>
            <CardHeader
              title={recipe.title}
              subheader={recipe.time}
              action={
                <IconButton aria-label="settings" onClick={(e) => {handleDelete(recipe.recipeId, e)}}>
                  <Delete />
                </IconButton>
              }
            />
          <CardMedia
            component="img"
            height="194"
            image={recipe.image}
            alt="Dish foto"
          />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
         Instructions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.instructions}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <StyledRating
        name="customized-color"
        defaultValue={recipe.rating}
        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients:</Typography>
          <List>
          {recipe.ingredients.map((item, index)=> {
            return (
              <ListItem key={index}>
                  <ListItemText>{item.quantity} {item.name}</ListItemText>
                </ListItem>
            )
          })}
  
      
            </List>
        </CardContent>
      </Collapse>
    </Card>
        )
      })}
    </div>
  )
}

export default Recipes
