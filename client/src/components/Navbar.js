import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth, logout} from '../auth';

const LoggedInLinks = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return(
    <>
      <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
      <li className="nav-item">
            <Link className="nav-link" to="/create_recipe">Create Recipe</Link>
          </li>

      <li className="nav-item">
            <a className="nav-link" href="#" onClick={handleLogout}>Log Out</a>
          </li>
      

    </>
  )
}

const LoggedOutLinks = () => {
  return(
    <>
      <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
      

          </>)}

const Navbar = () => {

  const [logged] = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">Recipes</Link>

        <ul className="navbar-nav">
          {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
