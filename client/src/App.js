import Layout from './pages/Layout/index.jsx';
import Home from './pages/Home';

import './style.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Recipe from './pages/Recipe/Recipe.jsx';
import Fridge from './pages/Fridge/Fridge.jsx';
import Statistic from './pages/Statistic/Statistic.jsx';


function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        // if (!currentUser) {
        //     return <Navigate to='/login' />;
        // }

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
                      
                    </Route>
                </Route>
                {/* <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
