import dbConnect from "../mongo/index.js";
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import fetchData from "../external_api/index.js";

const generateCartId = () => uuidv4();

const createNewRecipe = async (newRecipe) => {
    const db = await dbConnect();
    console.log(fetchData);
    const image = await fetchData(newRecipe.title);
    const recipe = {
        recipeId: generateCartId(),
        image : image,
        time: DateTime.now().toFormat('MM-dd-yyyy'),
        title: newRecipe.title, 
        category: newRecipe.category,
        ingredients: newRecipe.ingredients,
        instructions: newRecipe.instructions,
        rating : 0
      }
  const result = await db.insertOne(recipe);
  return await db.findOne({ _id: result.insertedId });
  };
  
  
 const getRecipes = async () => {
    const db = await dbConnect();
    return await db.find().toArray();
  };
  
  const updateRecipeRating = async (recipeId, recipeRating) => {
    const db = await dbConnect();
    const recipe = await db.findOne({ recipeId: recipeId })
    if(recipe.recipeId === recipeId) {
      db.updateOne({recipeId: recipeId}, {$set:{rating: recipeRating}});
      return await db.findOne({ recipeId: recipeId });
    } else {
      throw new Error("Id was not found")
    }
  }

  const deleteRecipe = async (recipeId) => {
    const db = await dbConnect();
    const recipe = await db.findOne({ recipeId: recipeId })
    if(recipe.recipeId === recipeId) {
        await db.deleteOne( { recipeId: recipeId })
        return
    } else {
      throw new Error("Id was not found")
    }
  };


export { createNewRecipe, getRecipes, deleteRecipe,updateRecipeRating };
  