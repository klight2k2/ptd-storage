import React, { useEffect, useState } from 'react';
import ImportService from '../../services/ImportService';
import RecipeService from '../../services/RecipeService';
import { convertToDate, formatDate, formatImageLink } from '../../utils/timeUtil';
import { Space, Image } from 'antd';

import './home.scss';

export default function Home() {
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const handleGetIngredient = async () => {
        const currentDate = new Date();
        var currentDay = currentDate.getDate();
        currentDate.setDate(currentDay + 3);
        const res = await ImportService.getSoonExpiredImportIngredient(null, formatDate(currentDate));
        if (res) {
            setIngredients(res);
            console.log('home', res);
        }
    };
    const handleGetRecipe = async () => {
        const res = await RecipeService.getLastest();
        if (res) {
            setRecipes(res);
            console.log('home', res);
        }
    };
    useEffect(() => {
        handleGetIngredient();
        handleGetRecipe();
    }, []);
    return (
        <div>
            <h3>Nguyên liệu sắp hết hạn</h3>
            <div className='ingredient-container'>
                {ingredients.map((item) => {
                    const ingredientInfo = item.ingredient;
                    return (
                        <div className='ingredient'>
                            <div className='ingredient-info'>
                                <p>{ingredientInfo.ingredient_name}</p>
                                <p>Hạn sử dụng :{convertToDate(item.import_exp)} </p>
                                <p>
                                    khối lượng:{item.orginal_amount} {ingredientInfo.ingredient_unit}
                                </p>
                                <p>
                                    Còn lại: {item.remain_amount} {ingredientInfo.ingredient_unit}
                                </p>
                            </div>
                            <img
                                className='ingredient-img'
                                src='https://forza.com.vn/wp-content/uploads/2021/03/ky-thuat-so-che-nguyen-lieu-220321-06-e1616398596327.jpg'
                            ></img>
                        </div>
                    );
                })}
            </div>

            <h3 className='mt-16 mb-16'>Danh sách công thức mới thêm </h3>
            <div  className='ingredient-container'>
                {recipes.map((item) => {
                    return (
                        <div className='ingredient'>
                            <div className='ingredient-info'>
                                <p>{item.recipe_name}</p>
                                <p>Mô tả: {item.recipe_description} </p>
                                <p>Thời gian nấu: {item.time_cook} </p>
                            </div>
                            <img
                                className='ingredient-img'
                                src={formatImageLink(item.image_url)}
                            ></img>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
