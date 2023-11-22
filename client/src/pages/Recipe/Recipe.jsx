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
                    <Search className='recipe-search' placeholder='Enter recipe name...' onSearch={onSearch} />
                    <Button onClick={handleOpen} icon={<FileAddOutlined />}>
                        {' '}
                       Add recipe
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
                                            <p>Time cook: {item.time_cook}</p>
                                            <p>
                                                Ingredients:
                                                <div className='grid-2 mt-16'>
                                                    {item.recipe_ingredients?.map((ingre) => {
                                                        const ingredient = ingre.ingredient;
                                                        return <li>{`${ingredient?.ingredient_name} ${ingre.amount} ${ingredient?.ingredient_unit}`}</li>;
                                                    })}
                                                </div>
                                            </p>
                                            <p>Description: {item.recipe_description}</p>
                                        </div>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <Popconfirm
                                            title='Delete the recipe'
                                            description='Are you sure to delete this recipe?'
                                            onConfirm={() => handleDeleteRecipe(item._id)}
                                            okText='Yes'
                                            cancelText='No'
                                            className='mr-8'
                                        >
                                            <Button>Delete</Button>
                                            {/* <DeleteOutlined style={{ fontSize: 24 }} /> */}
                                        </Popconfirm>
                                        <Button
                                        type='primary'
                                            onClick={() => {
                                                handleOpenEdit(item);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                                <Divider></Divider>
                            </>
                        );
                    })}
                </div>
            </div>

            <Modal title={selectedRecipe ? 'Sửa công thức' : 'Thêm công thức'} open={open} onOk={handleSubmit} onCancel={() => setOpen(false)}>
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
                        label='Recipe name'
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
                        label='Recipe description'
                        name='recipe_description'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your recipe description!',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                    <Form.Item
                        label='Time cook'
                        name='time_cook'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your time cook!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label='Image'>
                        <input type='file' onChange={handleFileChange} id='file' style={{ display: 'none' }} />
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            {previewUrl && <img size={148} src={previewUrl} className='preview-avt'></img>}
                            <label htmlFor='file' className='upload-icon'>
                                <div className='upload-btn'>
                                    <UploadOutlined style={{ fontSize: '20px', cursor: 'pointer' }} /> Upload
                                </div>
                            </label>
                        </div>
                    </Form.Item>
                    <Form.Item name={'recipe_ingredients'} label='ingredients'>
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
                                        + Add Sub Item
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
