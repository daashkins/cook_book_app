import dbConnect from "../mongo/index.js";
import { v4 as uuidv4 } from 'uuid';

const generateCartId = () => uuidv4();

const createNewRecipe = async (newRecipe) => {
    const db = await dbConnect();
    const recipe = {
        recipeID : generateCartId(),
        title: newRecipe.title, 
        ingredients: [...newRecipe.ingredients],
        insctructions: newRecipe.insctructions,
        likes : 0
      }
  const result = await db.insertOne(recipe);
  return await db.findOne({ _id: result.insertedId });
  };
  
  
 const getRecipes = async () => {
    const db = await dbConnect();
    return await db.find().toArray();
  };
  
//   const updateCart = async cart => {};
//   const deleteCart = async cartId => {};


export { createNewRecipe, getRecipes,
    // updateCart,
    // deleteCart,
  };
  