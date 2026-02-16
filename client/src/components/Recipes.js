import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../auth';
import Button from 'react-bootstrap/Button';
import {Card} from 'react-bootstrap';
const Recipes = ({ id, title, description }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit_recipe/${id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            authFetch(`/recipe/recipes/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete recipe');
                    }
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error deleting recipe:', error);
                    alert('Failed to delete recipe');
                });
        }
    };

    return (
        <div className="recipes container" style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
            <h3>{title}</h3>
            <p>{description}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="warning" size="sm" onClick={handleEdit}>Edit</Button>
                <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    )
}
export default Recipes;