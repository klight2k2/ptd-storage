import { useContext, useEffect, useState } from 'react';
import ImportService from '../../services/ImportService';
import { AuthContext } from '../../context/AuthContext';
import { convertToDate, formatImageLink } from '../../utils/timeUtil';
import { FileAddOutlined, UploadOutlined, CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Modal, Button, Popconfirm, Form, InputNumber, Divider } from 'antd';

import IngredientService from '../../services/IngredientService';

import './category.scss';
const { Option } = Select;
const { Search } = Input;
export default function Category() {
    const [open, setOpen] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState();
    const [previewUrl, setPreviewUrl] = useState('');
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        form.submit();
    };

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
    const handleGetIngredients = async () => {
        const res = await IngredientService.getAll();
        if (res) {
            setIngredients(res);
            setFilteredIngredients(res);
        }
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleDeleteCategory = async (id) => {
        console.log(id);
        const res = await IngredientService.deleteIngredient(id);
        if (res) {
            await handleGetIngredients();
        }
    };
    const onFinish = async (values) => {
        let formData = new FormData();
        formData.append('ingredient_name', values.ingredient_name);
        formData.append('ingredient_unit', values.ingredient_unit);
        formData.append('image', selectedFile);
        const res = await IngredientService.createIngredient(formData);
        if (res) {
            await handleGetIngredients();
            setPreviewUrl();
            form.resetFields();
            setOpen(false);
        }
    };
    const onSearch = (searchKey) => {
        const filtered = ingredients.filter((ingredient) => ingredient.ingredient_name.includes(searchKey));
        setFilteredIngredients(filtered);
    };

    useEffect(() => {
        handleGetIngredients();
    }, []);

    return (
        <div>
            <h3>カテゴリー</h3>

            <div className='import-action'>
                <Search className='import-search' placeholder='検索するカテゴリーを入力してください' onSearch={onSearch} />
                <Button onClick={handleOpen} icon={<PlusOutlined />}>
                    {' '}
                材料を追加
                </Button>
            </div>
            <div className='category-list'>
                {filteredIngredients.map((item) => {
                    return (
                      <>
                        <div className='category-item'>
                            <div className='category'>
                                <img src={formatImageLink(item.image_url)} className='category-img'></img>
                                <div className='category-info'>
                                    <h3>食材の名前: {item.ingredient_name}</h3>
                                    <p>単位: {item.ingredient_unit}</p>
                                </div>
                            </div>
                            <div>
                                <Popconfirm
                                    title='カテゴリーを削除する'
                                    description='このカテゴリーを削除してもよろしいですか。'
                                    onConfirm={() => handleDeleteCategory(item._id)}
                                    okText='Yes'
                                    cancelText='No'
                                    className='mr-8'
                                >
                                    <Button>削除</Button>
                                    {/* <DeleteOutlined style={{ fontSize: 24 }} /> */}
                                </Popconfirm>
                                {/* <Button
                                    type='primary'
                                    onClick={() => {
                                        handleOpenEdit(item);
                                    }}
                                >
                                    Edit
                                </Button> */}
                            </div>
                        </div>
                            <Divider></Divider>
                        </>
                    );
                })}
            </div>
            <Modal title='材料を追加' open={open} onOk={handleSubmit} onCancel={() => setOpen(false)}>
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
                    onFinish={onFinish}
                    autoComplete='off'
                >
                    <Form.Item
                        label='食材の名前'
                        name='ingredient_name'
                        rules={[
                            {
                                required: true,
                                message: 'このフィールドは必須です!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='単位'
                        name='ingredient_unit'
                        rules={[
                            {
                                required: true,
                                message: 'このフィールドは必須です!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='イメージ'
                        rules={[
                            {
                                required: true,
                                message: 'このフィールドは必須です!',
                            },
                        ]}
                    >
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
                </Form>
            </Modal>
        </div>
    );
}
