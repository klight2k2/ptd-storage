import Title from 'antd/es/typography/Title';
import './ingredients.scss';
import { useContext, useEffect, useState } from 'react';
import IngredientService from '../../services/IngredientService';
import { AuthContext } from '../../context/AuthContext';

const Ingredients = () => {
    const [listIngredients, setListIngredients] = useState([]);
    const {currentUser, setCurrentUser} = useContext(AuthContext);

    const getListIngredients = async() => {
        console.log(currentUser);
        const response = await IngredientService.getAllImportIngredient();
        console.log(response);
        const data = await response.json();
        setListIngredients(data);
    };

    useEffect(() => {
        getListIngredients();
    });

    return (
        <div className="Ingredients">
            <Title level={3} style={{color: '#00D', fontWeight: 700}}>DANH SÁCH CÁC LOẠI NGUYÊN LIỆU</Title>
            <div className = "listIngredients">

            </div>
        </div>
    );
}

export default Ingredients;