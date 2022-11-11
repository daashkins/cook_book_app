import React, { useState } from 'react'
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import Delete from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

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
  const [recipes, setRecipes] = useState([]);
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
   });
  }

  const handleUpdateRating = (id, e, index) => {
    fetch(`http://localhost:8080/recipes/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({rating: e.target.value}),
  })
  .then(response => {
  if(response.status === 200) {
    fetch("http://localhost:8080/recipes", {
      method: "GET",
      mode: "cors",
      headers: {"Content-Type": 'application/json'},
  })
  .then(response =>response.json())
  .then(data => setRecipes(data));
  }
    })
  };

const renderImage =(image) => {
  if(image === null) {
    return (require("../images/placeholder.jpg"))
  }
  return image;
} 
  const convertRating = (string) => {
    return parseInt(string);
  }
useEffect(() => {
  fetch("http://localhost:8080/recipes", {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": 'application/json'},
    })
    .then(response =>response.json())
    .then(data => setRecipes(data));
},[recipes])
  return (
    <div className='recipe_list'>
      {recipes.map((recipe, index) => {
        return (
          <Card className='recipe_item'key={index} sx={{ minWidth: 270}}>
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
            image={renderImage(recipe.image)}
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
        value={convertRating(recipe.rating)}
        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        onChange={(e) => handleUpdateRating(recipe.recipeId, e)}
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
              <ListItem className="li_ingredients" key={index} sx={{ paddingLeft: 0 }} >
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
