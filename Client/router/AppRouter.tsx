import { Route, Routes } from "react-router-dom";
import Register from "../src/pages/Register.tsx"
import Login from "../src/pages/Login.tsx"
import Home from '../src/majorComponents/Home/Home.tsx';
const AppRouter = () => {
    return (
    <>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    </>
  )
}

export default AppRouter
