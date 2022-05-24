import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./data.json'));
const router = express.Router();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

// GET all recipes
app.get('/recipes', (req, res) => {
  try {
    res.status(200).json({
      status: 'Success ✨',
      data,
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
  const recipe = data.recipes.find((recipe) => recipe.name === id);

  try {
    res.status(200).json({
      status: 'Success ✨',
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
  data.push(recipe);
  res.status(201).send('recipe added');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
