import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./data.json'));
const router = express.Router();

const recipeData = data.recipes;

const app = express();
const PORT = 5000;
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

// GET all recipes
app.get('/recipes', (req, res) => {
  try {
    res.status(200).json({
      recipes: recipeData,
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e,
    });
  }
});

// GET recipe as string param
app.get('/recipes/details/:id', (req, res) => {
  const { id } = req.params;
  const recipe = recipeData.find((recipe) => recipe.name === id);

  try {
    res.status(200).json({
      data: recipe,
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e,
    });
  }
});

// POST request
app.post('/recipes', (req, res) => {
  const recipe = req.body;
  recipeData.push({ ...recipe });
  res.status(201).send(recipeData);
});

app.put('/recipes/:id', (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const recipeIndex = recipeData.findIndex((recipe) => recipe.name === id);
  const updatedRecipe = { id: id, ...body };

  recipeData[recipeIndex] = updatedRecipe;
  res.send(recipeData[recipeIndex]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
