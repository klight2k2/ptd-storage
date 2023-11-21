import { Select, Input, Modal, Button, Popconfirm, Form, Space, Divider } from 'antd';
import './importIngredients.scss';
import { useContext, useEffect, useState } from 'react';
import ImportService from '../../services/ImportService';
import { AuthContext } from '../../context/AuthContext';
import { convertToDate, formatImageLink } from '../../utils/timeUtil';
import { FileAddOutlined, UploadOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import IngredientService from '../../services/IngredientService';
const { Option } = Select;
const { Search } = Input;
const ImportIngredients = () => {
    const [importsIngredient, setImportIngredients] = useState([]);
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [units, setUnits] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [reload, setReload] = useState(false);

    const handleGetIngredients = async () => {
        const data = await IngredientService.getAll();
        let units = {};
        data.map((item) => {
            units[item._id] = item.ingredient_unit;
        });
        console.log("unit",units)
        setUnits(units);
        const mapData = data.map((item) => {
            return { value: item._id, label: item.ingredient_name, item };
        });
        setIngredients(mapData);
    };

    const [form] = Form.useForm();
    const onSearch = (value, _e, info) => {
        // const filteredRecipe = recipes.filter((recipe) => {
        //     return recipe.recipe_name.includes(value);
        // });
        // setFilteredRecipes(filteredRecipe);
    };
    const handleOpen = async () => {
        setOpen(true);
        await handleGetIngredients();
    };
    const handleChangeIngredient = async (e) => {
        console.log('ingredient', e);
    };
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
 
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const handleSubmit = async () => {
        console.log("submit import", form.getFieldsValue())
        

    };
    const [open, setOpen] = useState(false);
    const getListIngredients = async () => {
        console.log(currentUser);
        const response = await ImportService.getAllImportIngredient();
        console.log(response);
        setImportIngredients(response);
    };

    useEffect(() => {
        getListIngredients();
    }, []);

    return (
        <div className='import-container'>
            <h3>DANH SÁCH CÁC LOẠI NGUYÊN LIỆU</h3>

            <div className='import-action'>
                <Search className='import-search' placeholder='input search text' onSearch={onSearch} />
                <Button onClick={handleOpen} icon={<FileAddOutlined />}>
                    {' '}
                    Import ingredient
                </Button>
            </div>
            {importsIngredient.map((item, index) => {
                let ingredientInfo = item.ingredient;
                return (
                    <>
                        <div className='import' key={index}>
                            <img className='import-img' src={formatImageLink(ingredientInfo.image_url)} alt='' />
                            <div className='import-info'>
                                <p className='title'>{ingredientInfo.ingredient_name}</p>
                                <p>Hạn sử dụng :{convertToDate(item.import_exp)} </p>
                                <p>
                                    khối lượng:{item.orginal_amount} {ingredientInfo.ingredient_unit}
                                </p>
                                <p>
                                    Còn lại: {item.remain_amount} {ingredientInfo.ingredient_unit}
                                </p>
                                <p>Note: {item.note}</p>
                            </div>
                        </div>
                        <Divider />
                    </>
                );
            })}
            <Modal title='Import ingredient' open={open} onOk={handleSubmit} onCancel={() => setOpen(false)}>
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
                    autoComplete='off'
                >
                    <Form.Item
                        label='Ingredient'
                        name='ingredient'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your ingredient name!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            options={ingredients}
                            filterOption={filterOption}
                           
                            onChange={(e) => {
                                        setReload(!reload)                 
                                
                            }}
                            placeholder='Select a person'
                        ></Select>
                    </Form.Item>
                    <Form.Item
                        label='Expire Date'
                        name='import_exp'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your recipe name!',
                            },
                        ]}
                    >
                        <Input type='Date' />
                    </Form.Item>
                    <Form.Item
                        label='Amount'
                        name='orginal_amount'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your recipe name!',
                            },
                        ]}
                    >
                        <Input 
                          addonAfter={`${units[form.getFieldsValue()?.ingredient] || ''}`}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Note'
                        name='note'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your recipe name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ImportIngredients;
