import { Select, Input, Modal, Button, Popconfirm, Form, InputNumber, Divider,Tag } from 'antd';
import './importIngredients.scss';
import { useContext, useEffect, useState } from 'react';
import ImportService from '../../services/ImportService';
import { AuthContext } from '../../context/AuthContext';
import { convertToDate, formatImageLink, isExpired } from '../../utils/timeUtil';
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
    const [takeModal, setTakeModel] = useState(false);
    const [selectedImport, setSelectedImport] = useState();

    const handleGetIngredients = async () => {
        const data = await IngredientService.getAll();
        let units = {};
        data.map((item) => {
            units[item._id] = item.ingredient_unit;
        });
        console.log('unit', units);
        setUnits(units);
        const mapData = data.map((item) => {
            return { value: item._id, label: item.ingredient_name, item };
        });
        setIngredients(mapData);
    };

    const [form] = Form.useForm();
    const [takeForm] = Form.useForm();
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

    const handleTakeImport = async () => {
        takeForm.submit();
    };
    const onFinishTakeForm = async (values) => {
        console.log('Success:', values);
        const res = await ImportService.takeImportIngredient({ ...values, import_id: selectedImport._id });
        if (res) {
            setTakeModel(false);
            takeForm.resetFields();
            getListIngredients();
        }
    };

    const handleOpenTakeModal = async (import_ingredient) => {
        takeForm.resetFields();
        setTakeModel(true);
        console.log(import_ingredient);
        setSelectedImport(import_ingredient);
    };

    const handleChangeIngredient = async (e) => {
        console.log('ingredient', e);
    };

    const handleThrowImportIngredient = async (import_id) => {
        const res = await ImportService.throwImportIngredient(import_id);
        if (res) {
            await getListIngredients();
        }
    };
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const onFinish = async (values) => {
        console.log('Success:', values);
        const res = await ImportService.createImportIngredient(values);
        if (res) {
            setOpen(false);
            form.resetFields();
            getListIngredients();
        }
    };
    const handleSubmit = async () => {
        console.log('submit import', form.getFieldsValue());
        form.submit();
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
            <h3>材料バッチの完全なリスト</h3>

            <div className='import-action'>
                <Search className='import-search' placeholder='Enter ingredient name ...' onSearch={onSearch} />
                <Button onClick={handleOpen} icon={<FileAddOutlined />}>
                    {' '}
                    Import ingredient
                </Button>
            </div>
            {importsIngredient.map((item, index) => {
                let ingredientInfo = item.ingredient;
                return (
                    <>
                        <div className='import-wrapper'>
                            {' '}
                            <div className='import' key={index}>
                                <img className='import-img' src={formatImageLink(ingredientInfo.image_url)} alt='' />
                                <div className='import-info'>
                                    <p className='title'>{ingredientInfo.ingredient_name}</p>
                                    <p>Exp :{convertToDate(item.import_exp)} </p>
                                    <p>
                                        Amount:{item.original_amount} {ingredientInfo.ingredient_unit}
                                    </p>
                                    <p>
                                        Remain: {item.remain_amount} {ingredientInfo.ingredient_unit}
                                    </p>
                                    <p>Note: {item.note}</p>
                                    <p>{isExpired(item.import_exp) && <Tag color="red">Expired</Tag>}</p>
                                </div>
                            </div>
                            <div className='mt-16'>
                                <Popconfirm
                                    title='Throw the ingredient'
                                    description='Are you sure to throw this ingredient?'
                                    onConfirm={()=>{handleThrowImportIngredient(item._id)}}
                                    okText='Yes'
                                    cancelText='No'
                                    className='mr-8'
                                >
                                <Button>Throw</Button>
                                </Popconfirm>
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        handleOpenTakeModal(item);
                                    }}
                                >
                                    Take
                                </Button>
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
                                setReload(!reload);
                            }}
                            placeholder='Select a ingredient'
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
                        name='original_amount'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your recipe name!',
                            },
                        ]}
                    >
                        <Input addonAfter={`${units[form.getFieldsValue()?.ingredient] || ''}`} />
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

            <Modal
                title={`Lấy ra ${selectedImport?.ingredient?.ingredient_name}`}
                open={takeModal}
                onOk={handleTakeImport}
                onCancel={() => setTakeModel(false)}
            >
                <Form form={takeForm} onFinish={onFinishTakeForm}>
                    <Form.Item
                        label='Số lượng'
                        name='take_amount'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your take amount!',
                            },
                        ]}
                    >
                        <InputNumber max={Number(selectedImport?.remain_amount)} addonAfter={selectedImport?.ingredient?.ingredient_unit} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ImportIngredients;
