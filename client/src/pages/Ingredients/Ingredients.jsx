import Title from 'antd/es/typography/Title';
import './ingredients.scss';
import { useContext, useEffect, useState } from 'react';
import IngredientService from '../../services/IngredientService';
import { AuthContext } from '../../context/AuthContext';
import IngredientLineItem from './Components/IngredientLineItem/IngredientLineItem';

const Ingredients = () => {
    const [listIngredients, setListIngredients] = useState([]);
    const {currentUser, setCurrentUser} = useContext(AuthContext);

    const getListIngredients = async() => {
        console.log(currentUser);
        const response = await IngredientService.getAllImportIngredient();
        setListIngredients(response);
    };

    useEffect(() => {
        getListIngredients();
    },[]);

    return (
        <div className="Ingredients">
            <Title level={3} style={{color: '#00D', fontWeight: 700}}>DANH SÁCH CÁC LOẠI NGUYÊN LIỆU</Title>
            <div className = "listIngredients">
                {listIngredients && listIngredients.length > 0 && listIngredients.map((ingredient, index) => (
                    <IngredientLineItem ingredient = {ingredient} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default Ingredients;