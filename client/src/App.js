import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateRecipe from './components/CreateRecipe'
import EditRecipe from './components/EditRecipe'

const App = () => {
  return (
    <div className="">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create_recipe" element={<CreateRecipe />} />
        <Route path="/edit_recipe/:id" element={<EditRecipe />} />
      </Routes>
    </div>
  )
}

export default App
