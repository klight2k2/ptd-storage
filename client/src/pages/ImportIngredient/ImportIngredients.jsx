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
    const [filteredImportsIngredient, setFilteredImportIngredients] = useState([]);
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
        const filteredRecipe = importsIngredient.filter((import_ingre) => {
            return import_ingre.ingredient.ingredient_name.includes(value);
        });
        setFilteredImportIngredients(filteredRecipe);
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
        setFilteredImportIngredients(response);
    };

    useEffect(() => {
        getListIngredients();
    }, []);

    return (
        <div className='import-container'>
            <h3>材料バッチの完全なリスト</h3>

            <div className='import-action'>
                <Search className='import-search' placeholder='検索する食材を入力してください' onSearch={onSearch} />
                <Button onClick={handleOpen} icon={<FileAddOutlined />}>
                    {' '}
                    インポート
                </Button>
            </div>
            {filteredImportsIngredient.map((item, index) => {
                let ingredientInfo = item.ingredient;
                return (
                    <>
                        <div className='import-wrapper'>
                            {' '}
                            <div className='import' key={index}>
                                <img className='import-img' src={formatImageLink(ingredientInfo.image_url)} alt='' />
                                <div className='import-info'>
                                    <p className='title'>{ingredientInfo.ingredient_name}</p>
                                    <p>消費期限 :{convertToDate(item.import_exp)} </p>
                                    <p>
                                    量:{item.original_amount} {ingredientInfo.ingredient_unit}
                                    </p>
                                    <p>
                                    残り: {item.remain_amount} {ingredientInfo.ingredient_unit}
                                    </p>
                                    <p>メモ: {item.note}</p>
                                    <p>{isExpired(item.import_exp) && <Tag color="red">期限切れ</Tag>}</p>
                                </div>
                            </div>
                            <div className='mt-16'>
                                <Popconfirm
                                    title='材料を投げる'
                                    description='この材料を捨ててもいいですか。'
                                    onConfirm={()=>{handleThrowImportIngredient(item._id)}}
                                    okText='はい'
                                    cancelText='いいえ'
                                    className='mr-8'
                                >
                                <Button>捨てる</Button>
                                </Popconfirm>
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        handleOpenTakeModal(item);
                                    }}
                                >
                                    取る
                                </Button>
                            </div>
                        </div>
                        <Divider />
                    </>
                );
            })}
            <Modal title='インポート' open={open} onOk={handleSubmit} onCancel={() => setOpen(false)}>
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
                        label='材料'
                        name='ingredient'
                        rules={[
                            {
                                required: true,
                                message: '材料の名前を入力してください!',
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
                            placeholder='材料を選んでください'
                        ></Select>
                    </Form.Item>
                    <Form.Item
                        label='消費期限'
                        name='import_exp'
                        rules={[
                            {
                                required: true,
                                message: 'このフィールドは必須です!',
                            },
                        ]}
                    >
                        <Input type='Date' />
                    </Form.Item>
                    <Form.Item
                        label='量'
                        name='original_amount'
                        rules={[
                            {
                                required: true,
                                message: 'このフィールドは必須です!',
                            },
                        ]}
                    >
                        <Input addonAfter={`${units[form.getFieldsValue()?.ingredient] || ''}`} />
                    </Form.Item>
                    <Form.Item
                        label='メモ'
                        name='note'
                        rules={[
                            {
                                required: true,
                                message: 'このフィールドは必須です!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={`${selectedImport?.ingredient?.ingredient_name}`}
                open={takeModal}
                onOk={handleTakeImport}
                onCancel={() => setTakeModel(false)}
            >
                <Form form={takeForm} onFinish={onFinishTakeForm}>
                    <Form.Item
                        label='数量を取る'
                        name='take_amount'
                        rules={[
                            {
                                required: true,
                                message: 'このフィールドは必須です!',
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
