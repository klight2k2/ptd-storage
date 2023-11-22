import React, { useEffect, useState } from 'react';
import ImportService from '../../services/ImportService';
import RecipeService from '../../services/RecipeService';
import { convertToDate, formatDate, formatImageLink, isExpired } from '../../utils/timeUtil';
import { Space, Image,Tag ,Modal} from 'antd';

import './home.scss';

export default function Home() {
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState();


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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (recipe) => {
        setSelectedRecipe(recipe);

        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    useEffect(() => {
        handleGetIngredient();
        handleGetRecipe();
    }, []);
    return (
        <div>
            <h3 className='mb-16'>期限切れが近づいている材料</h3>
            <div className='ingredient-container'>
                {ingredients.map((item) => {
                    const ingredientInfo = item.ingredient;
                    return (
                        <div className='ingredient'>
                            <div className='ingredient-info'>
                                <p>{ingredientInfo.ingredient_name}</p>
                                <p>Exp :{convertToDate(item.import_exp)} </p>
                                <p>
                                    amount:{item.original_amount} {ingredientInfo.ingredient_unit}
                                </p>
                                <p>
                                   remain: {item.remain_amount} {ingredientInfo.ingredient_unit}
                                </p>
                                <p>{isExpired(item.import_exp)? <Tag color='red'>Expired</Tag>:<Tag color='gold'>Comming soon expired</Tag>}</p>
                            </div>
                            <img
                                className='ingredient-img'
                                src={formatImageLink(ingredientInfo.image_url)}
                            ></img>
                        </div>
                    );
                })}
            </div>

            <h3 className='mt-16 mb-16'>新しいレシピのリスト </h3>
            <div  className='ingredient-container'>
                {recipes.map((item) => {
                    return (
                        <div className='ingredient' onClick={()=>{
                            showModal(item)
                        }}>
                            <div className='ingredient-info'>
                                <p>{item.recipe_name}</p>
                                <p>Description: {item.recipe_description} </p>
                                <p>Time cook: {item.time_cook} </p>
                            </div>
                            <img
                                className='ingredient-img'
                                src={formatImageLink(item.image_url)}
                            ></img>
                        </div>
                    );
                })}
            </div>

            <Modal title="Recipe detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700}>
            <div className='recipe'>
                                        <img className='recipe-img' src={formatImageLink(selectedRecipe?.image_url)} alt='' />

                                        <div className='recipe-info' >
                                            <h3>{selectedRecipe?.recipe_name}</h3>
                                            <p>Time cook: {selectedRecipe?.time_cook}</p>
                                            <p>
                                                Ingredients:
                                                <div className='grid-2 mt-16'>
                                                    {selectedRecipe?.recipe_ingredients?.map((ingre) => {
                                                        const ingredient = ingre.ingredient;
                                                        return <li>{`${ingredient?.ingredient_name} ${ingre.amount} ${ingredient?.ingredient_unit}`}</li>;
                                                    })}
                                                </div>
                                            </p>
                                            <p>Description: {selectedRecipe?.recipe_description}</p>
                                        </div>
                                    </div>
    
      </Modal>
        </div>
    );
}
