import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs"); //render static index.ejs
});

app.post("/recipe", async (req, res) => {
  //call api using async function
  try {
    const cocktail = req.body.cocktail; // hold input value in var
    const result = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}` // attach it as a param
    );

    if (result.data.drinks) {
      // if param is available then do rest...
      const cocktailData = result.data.drinks[0]; // Store the entire cocktail data
      res.render("index.ejs", { cocktailData }); // render it on index.ejs if cocktaildata is available locally in this function
    } else {
      throw new Error("Cocktail not found!"); //throw error
    }
  } catch (error) {
    res.render("index.ejs", { error: error.message }); //render it in index.js if error is available locally
  }
});

app.listen(port, () => {
  console.log(`Listening server on the port ${port}`);
});
