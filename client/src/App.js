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
import History from './pages/History/History.jsx';
import ImportIngredients from './pages/ImportIngredient/ImportIngredients.jsx';
import Category from './pages/Category/Category.jsx';
import Account from './pages/Account/Account.jsx';


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
                        <Route index path='fridge/ingredients' element={<ImportIngredients />} />
                        <Route index path='fridge/category' element={<Category />} />
                        <Route index path='fridge/history' element={<History />} />
                        <Route index path='account-manage' element={<Account />} />
                      
                    </Route>
                </Route>
                <Route path='login' element={<Login />} />
                 <Route path='register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
