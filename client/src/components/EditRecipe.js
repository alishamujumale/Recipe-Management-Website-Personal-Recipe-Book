import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth, authFetch } from '../auth';

const EditRecipe = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editError, setEditError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [logged] = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/recipe/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to load recipe');
        }
        const data = await response.json();
        reset({
          title: data.title,
          description: data.description
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setEditError("Failed to load recipe");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, reset]);

  const onSubmit = (data) => {
    setEditError("");
    
    const recipeData = {
      title: data.title,
      description: data.description
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData)
    };

    authFetch(`/recipe/recipes/${id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Failed to update recipe');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Recipe updated:", data);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        setEditError(error.message || "Failed to update recipe. Please try again.");
      });
  };

  if (loading) {
    return <div className="container"><p>Loading recipe...</p></div>;
  }

  return (
    <div className="container">
      <div className="form">
        <h1>Edit Recipe</h1>
        {editError && <p style={{ color: 'red' }}><small>{editError}</small></p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Recipe Title</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter recipe title"
              {...register("title", { required: "Recipe title is required", maxLength: { value: 100, message: "Title cannot exceed 100 characters" } })}
            />
          </Form.Group>
          {errors.title && <p style={{ color: 'red' }}><small>{errors.title.message}</small></p>}
          <br></br>

          <Form.Group>
            <Form.Label>Description / Instructions</Form.Label>
            <Form.Control 
              as="textarea"
              rows={6}
              placeholder="Enter recipe description and instructions"
              {...register("description", { required: "Description is required", minLength: { value: 10, message: "Description must be at least 10 characters" } })}
            />
          </Form.Group>
          {errors.description && <p style={{ color: 'red' }}><small>{errors.description.message}</small></p>}
          <br></br>

          <Button variant="primary" type="submit">Update Recipe</Button>
          <Button variant="secondary" onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>Cancel</Button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
