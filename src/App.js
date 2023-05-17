import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  // en funktion för att kunna söka
  const searchRecipes = async () => {
    setIsLoading(true); 
    const url = searchApi + query; 
    const res = await fetch(url); // skcikar en get request till theMealdb API
    const data = await res.json(); 
    setRecipes(data.meals); 
    setIsLoading(false); //sätter den till false för att visa att sök är färdig
  };

  useEffect(() => {
    searchRecipes(); 
  }, []);

  // funktion för att hantera submit
  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <div className="container">
      <h2>Meals</h2>
      <SearchBar
        isLoading={isLoading} 
        query={query} 
        setQuery={setQuery}
        handleSubmit={handleSubmit} 
      />
      <div className="recipes">
        {recipes ? (
          
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          // Om man stavar fel eller maträtten ej finns så visas detta upp
          "No Meals found."
        )}
      </div>
    </div>
  );
}

export default App;
