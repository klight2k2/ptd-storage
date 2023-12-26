import './recipe.scss';
import React, { useEffect, useState } from 'react';
import RecipeService from '../../services/RecipeService';
import { FileAddOutlined, UploadOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Select, Input, Modal, Button, Popconfirm, Form, Space, Divider } from 'antd';
import ImportService from '../../services/ImportService';
import { formatImageLink } from '../../utils/timeUtil';
const { Search } = Input;
const { Option } = Select;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function Recipe() {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredient] = useState([]);
    const [selectedIngredient, setSelectedIngredients] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState([]);
    const [units, setUnits] = useState([]);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleGetIngredient = async () => {
        const res = await ImportService.getAllIngredient();
        let units = {};
        res.map((item) => {
            units[item._id] = item.ingredient_unit;
        });
        setUnits(units);
        setIngredient(res);
    };
    const handleOpen = () => {
        setSelectedRecipe()
        handleGetIngredient();
        setOpen(true);
    };
    const handleGetRecipes = async () => {
        const res = await RecipeService.getAll();
        setRecipes(res);
        setFilteredRecipes(res);
    };

    useEffect(() => {
        handleGetRecipes();
    }, [open]);
    const onSearch = (value, _e, info) => {
        const filteredRecipe = recipes.filter((recipe) => {
            return recipe.recipe_name.includes(value);
        });
        setFilteredRecipes(filteredRecipe);
    };
    const handleDeleteRecipe = async (recipe_id) => {
        const res = await RecipeService.deleteRecipe(recipe_id);
        if (res) {
            handleGetRecipes();
        }
    };

    const handleOpenEdit = async (recipe) => {
        const ingre = recipe.recipe_ingredients.map((item) => ({
            ingredient: item.ingredient._id,
            amount: item.amount,
        }));
        await handleOpen();
        form.setFieldsValue({ ...recipe, recipe_ingredients: ingre });
        setPreviewUrl(formatImageLink(recipe.image_url));
        console.log(recipe);
        setSelectedRecipe(recipe);
    };
    const handleSubmit = async () => {
        console.log(form.getFieldsValue());
        const formValue = form.getFieldsValue();
        let formData = new FormData();
        formData.append('recipe_name', formValue.recipe_name);
        formData.append('recipe_description', formValue.recipe_description);
        formData.append('time_cook', formValue.time_cook);
        formData.append('recipe_ingredients', JSON.stringify(formValue.recipe_ingredients));
        formData.append('image', selectedFile);
        let res;
        if (!selectedRecipe) res = await RecipeService.createRecipe(formData);
        else {
            console.log('recipe', selectedRecipe);
            formData.append('image_url', selectedRecipe.image_url);
            res = await RecipeService.updateRecipe(selectedRecipe._id, formData);
        }
        if (res) {
            setSelectedFile();
            setOpen(false);
            setSelectedRecipe();
            setPreviewUrl('');
            form.resetFields();
        }
    };
    return (
        <>
            <div className='recipe-container'>
                <h3>レシピのリスト </h3>
                <div className='recipe-action'>
                    <Search className='recipe-search' placeholder='検索するレシピ名を入力してください' onSearch={onSearch} />
                    <Button onClick={handleOpen} icon={<FileAddOutlined />}>
                        {' '}
                       レシピを追加
                    </Button>
                </div>
                <div className='recipes-list'>
                    {filteredRecipes.map((item) => {
                        return (
                            <>
                                <div className='recipe-item'>
                                    <div className='recipe'>
                                        <img className='recipe-img' src={formatImageLink(item.image_url)} alt='' />

                                        <div className='recipe-info'>
                                            <h3>{item.recipe_name}</h3>
                                            <p>調理時間: {item.time_cook}</p>
                                            <p>
                                                材料:
                                                <div className='grid-2 mt-16'>
                                                    {item.recipe_ingredients?.map((ingre) => {
                                                        const ingredient = ingre.ingredient;
                                                        return <li>{`${ingredient?.ingredient_name} ${ingre.amount} ${ingredient?.ingredient_unit}`}</li>;
                                                    })}
                                                </div>
                                            </p>
                                            <p>デスクリプション: {item.recipe_description}</p>
                                        </div>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <Popconfirm
                                            title='レシピを削除する'
                                            description='このレシピを削除してもよろしいですか。'
                                            onConfirm={() => handleDeleteRecipe(item._id)}
                                            okText='はい'
                                            cancelText='いええ'
                                            className='mr-8'
                                        >
                                            <Button>削除</Button>
                                            {/* <DeleteOutlined style={{ fontSize: 24 }} /> */}
                                        </Popconfirm>
                                        <Button
                                        type='primary'
                                            onClick={() => {
                                                handleOpenEdit(item);
                                            }}
                                        >
                                            編集
                                        </Button>
                                    </div>
                                </div>
                                <Divider></Divider>
                            </>
                        );
                    })}
                </div>
            </div>

            <Modal title={selectedRecipe ? 'レシピを編集' : 'レシピを追加'} open={open} onOk={handleSubmit} onCancel={() => setOpen(false)}>
                <Form
                    name='basic'
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    labelAlign='left'
                    labelWrap
                    wrapperCol={{
                        span: 18,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item
                        label='レシピの名前'
                        name='recipe_name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your recipe name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='デスクリプション'
                        name='recipe_description'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your recipe description!',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={1000} />
                    </Form.Item>
                    <Form.Item
                        label='調理時間'
                        name='time_cook'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your 調理時間!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label='イメージ'>
                        <input type='file' onChange={handleFileChange} id='file' style={{ display: 'none' }} />
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            {previewUrl && <img size={148} src={previewUrl} className='preview-avt'></img>}
                            <label htmlFor='file' className='upload-icon'>
                                <div className='upload-btn'>
                                    <UploadOutlined style={{ fontSize: '20px', cursor: 'pointer' }} /> アップロード
                                </div>
                            </label>
                        </div>
                    </Form.Item>
                    <Form.Item name={'recipe_ingredients'} label='材料'>
                        <Form.List name={['recipe_ingredients']}>
                            {(subFields, subOpt) => (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        rowGap: 16,
                                    }}
                                >
                                    {subFields.map((subField, index) => (
                                        <Space key={subField.key}>
                                            <Form.Item noStyle name={[subField.name, 'ingredient']}>
                                                <Select
                                                    placeholder='Select ingredient'
                                                    onChange={(e) => {
                                                        console.log('Selecti', form.getFieldsValue());
                                                    }}
                                                >
                                                    {ingredients.map((item) => {
                                                        return <Option value={item._id}>{item.ingredient_name} </Option>;
                                                    })}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item noStyle name={[subField.name, 'amount']}>
                                                <Input
                                                    placeholder='Amount'
                                                    addonAfter={`${units[form?.getFieldsValue()?.recipe_ingredients[index]?.ingredient] || ''}`}
                                                />
                                            </Form.Item>
                                            <CloseOutlined
                                                onClick={() => {
                                                    subOpt.remove(subField.name);
                                                }}
                                            />
                                        </Space>
                                    ))}
                                    <Button type='dashed' onClick={() => subOpt.add()} block>
                                        + サブ食材を追加する  
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
