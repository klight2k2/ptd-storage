import Layout from './pages/Layout/index.jsx';
import Home from './pages/Home/Home.jsx';

import './style.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Recipe from './pages/Recipe/Recipe.jsx';
import Fridge from './pages/Fridge/Fridge.jsx';
import Statistic from './pages/Statistic/Statistic.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Ingredients from './pages/Ingredients/Ingredients.jsx';
import History from './pages/History/History.jsx';


function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        console.log("currentUser", currentUser)
        if (!currentUser) {
            return <Navigate to='/login' />;
        }

        return children;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                  
                        <Route index path='home' element={<Home />} />
                        <Route index path='recipe' element={<Recipe />} />
                        <Route index path='fridge' element={<Fridge />} />
                        <Route index path='statistic' element={<Statistic />} />
                        <Route index path='fridge/ingredients' element={<Ingredients />} />
                        <Route index path='fridge/history' element={<History />} />
                      
                    </Route>
                </Route>
                <Route path='login' element={<Login />} />
                 <Route path='register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
