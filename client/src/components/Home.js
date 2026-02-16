import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Recipe from "./Recipes";

const LoggedInHome = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/recipe/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
    const interval = setInterval(fetchRecipes, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="home container">
        <h1 className="Heading">Welcome Back!</h1>
        <p>Browse and create your favorite recipes</p>
        <Link to='/create_recipe' className="btn btn-primary">Create Recipe</Link>
      </div>
      <div className="recipes">
        <h1>List of Recipes</h1>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} id={recipe.id} title={recipe.title} description={recipe.description} />
        ))}
      </div>
    </>
  );
};

const LoggedOutHome = () => {
  return (
    <div className="home container">
      <h1 className="Heading">Welcome to the Recipe Book</h1>
      <Link to='/signup' className="btn btn-primary">Get Started</Link>
    </div>
  );
};

const Home = () => {
  const [logged] = useAuth();

  return logged ? <LoggedInHome /> : <LoggedOutHome />;
};

export default Home;
