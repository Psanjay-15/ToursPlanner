import React from 'react'
import { Route, Routes } from "react-router-dom";
import Register from "../src/pages/Register.tsx"
import Login from "../src/pages/Login.tsx"
const AppRouter = () => {
    return (
    <>
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    </>
  )
}

export default AppRouter
