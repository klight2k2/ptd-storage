import { Select, Input, Modal, Button, Popconfirm, Form, Space, Divider } from 'antd';
import './ingredients.scss';
import { useContext, useEffect, useState } from 'react';
import IngredientService from '../../services/IngredientService';
import { AuthContext } from '../../context/AuthContext';
import { convertToDate, formatImageLink } from '../../utils/timeUtil';

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const getListIngredients = async () => {
        console.log(currentUser);
        const response = await IngredientService.getAllImportIngredient();
        console.log(response);
        setIngredients(response);
    };

    useEffect(() => {
        getListIngredients();
    }, []);

    return (
        <div className='import-container'>
            <h3>
                DANH SÁCH CÁC LOẠI NGUYÊN LIỆU
            </h3>
            {ingredients.map((item,index) => {
                let ingredientInfo=item.ingredient
                return (
                  <>
                    <div className='import' key={index}>
                        <img className='import-img' src={formatImageLink(ingredientInfo.image_url)} alt='' />
                        <div className="import-info">
                        <p className='title'>{ingredientInfo.ingredient_name}</p>
                                <p>Hạn sử dụng :{convertToDate(item.import_exp)} </p>
                                <p>
                                    khối lượng:{item.orginal_amount} {ingredientInfo.ingredient_unit}
                                </p>
                                <p>
                                    Còn lại: {item.remain_amount} {ingredientInfo.ingredient_unit}
                                </p>
                                <p>
                                    Note: {item.note} 
                                </p>
                        </div>
                    </div>
                    <Divider/></>
                );
            })}
        </div>
    );
};

export default Ingredients;
