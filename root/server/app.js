import express from 'express';
import cors from 'cors';
import { getRecipes, createNewRecipe, deleteRecipe } from "./src/models/index.js";
const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'You have reached the Cook Boo API' }));

app.get('/recipes', async (req, res) => {
    try {
    const recipes = await getRecipes();
    res.json(recipes);
    } catch(err) {
        console.log(err);
    }
});

app.post('/recipes', async (req, res) => {
const newRecipe = req.body;
  try {
    const result = await createNewRecipe(newRecipe);
    res.status(201)
      .setHeader('Location', `recipes/:${result._id}`)
      .json(result);
  } catch (err) {
    console.log(err);
    res.status(400)
      .end();
  }
});

app.delete('/recipes/:id', async (req, res) => {
  console.log(req.params.id)
  const id = req.params.id;
  try {
   await deleteRecipe(id);
    res.status(204)
      .setHeader('Location', '/api/recipes/')
      .set('Content-Type', 'application/json')
      .end();
  } catch (err) {
    console.log(err);
    res.status(404)
      .end();
  }
  });
  


// app.get('/rec:cartid', async (req, res) => {
//   const id = req.params.cartid;
//   const cart = await db.getCartById(id.toString());
//   console.log(cart);
//   try {
//     if (cart) {
//     res.status(200)
//        .json(cart);
//       } else {
//         throw new Error("Not found");
//       } 
//   } catch (err) {
//     console.log(err);
//     res.status(404)
//        .json({message: "A description of the error"});
//   }
// });



export default app;
