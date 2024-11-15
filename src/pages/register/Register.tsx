import React from 'react';
import axios from 'axios';
import {Form, Input, Button, DatePicker, Select, message} from 'antd';
import "./register.scss";

const {Option} = Select;

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const [tinhData, setTinhData] = React.useState([]);
    const [quanData, setQuanData] = React.useState([]);
    const [phuongData, setPhuongData] = React.useState([]);
    const [selectedTinh, setSelectedTinh] = React.useState('');
    const [selectedQuan, setSelectedQuan] = React.useState('');

    React.useEffect(() => {
        // Fetch tinh data
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => setTinhData(response.data.data))
            .catch(error => console.error('Error fetching tinh data:', error));
    }, []);

    const handleTinhChange = (value: string) => {
        setSelectedTinh(value);
        axios.get(`https://esgoo.net/api-tinhthanh/2/${value}.htm`)
            .then(response => {
                setQuanData(response.data.data);
                setSelectedQuan(''); // Reset quan when tinh changes
                setPhuongData([]); // Clear phuong data
            })
            .catch(error => console.error('Error fetching quan data:', error));
    };

    const handleQuanChange = (value: string) => {
        setSelectedQuan(value);
        axios.get(`https://esgoo.net/api-tinhthanh/3/${value}.htm`)
            .then(response => setPhuongData(response.data.data))
            .catch(error => console.error('Error fetching phuong data:', error));
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);

        // Gửi yêu cầu POST đến json-server để lưu thông tin đăng ký
        axios.post('http://localhost:3001/users', values)
            .then(response => {
                console.log('Registration successful:', response.data);
            message.success("Đăng kí thành công!")
            })
            .catch(error => {
                console.error('There was an error!', error);
                // Xử lý lỗi khi đăng ký thất bại
            });
    };

    return (
        <Form
            className="register"
            form={form}
            name="register"
            onFinish={onFinish}
            labelCol={{span: 6}}
            wrapperCol={{span: 16}}
            initialValues={{prefix: '86'}}
            style={{maxWidth: 600, margin: '0 auto', marginTop: '5%', paddingTop: '10px'}} // Căn giữa form
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {type: 'email', message: 'E-mail không hợp lệ!'},
                    {required: true, message: 'Hãy nhập địa chỉ email!'}
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{required: true, message: 'Hãy nhập mật khẩu!'}]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="username"
                label="Tên đăng nhập"
                tooltip="Tên bạn muốn người khác gọi bạn?"
                rules={[{required: true, message: 'Hãy nhập tên đăng nhập!', whitespace: true}]}
            >
                <Input/>
            </Form.Item>

            {/* Select Tỉnh Thành */}
            <Form.Item
                name="province"
                label="Tỉnh Thành"
                rules={[{required: true, message: 'Hãy chọn tỉnh thành!'}]}
            >
                <Select value={selectedTinh} onChange={handleTinhChange}>
                    <Option value="">Chọn Tỉnh Thành</Option>
                    {tinhData.map(({full_name, id}) => (
                        <Option key={id} value={id}>{full_name}</Option>
                    ))}
                </Select>
            </Form.Item>

            {/* Select Quận Huyện */}
            <Form.Item
                name="quan"
                label="Quận Huyện"
                rules={[{required: true, message: 'Hãy chọn quận huyện!'}]}
            >
                <Select value={selectedQuan} onChange={handleQuanChange}>
                    <Option value="">Chọn Quận Huyện</Option>
                    {quanData.map(({full_name, id}) => (
                        <Option key={id} value={id}>{full_name}</Option>
                    ))}
                </Select>
            </Form.Item>

            {/* Select Phường Xã */}
            <Form.Item
                name="phuong"
                label="Phường Xã"
                rules={[{required: true, message: 'Hãy chọn phường xã!'}]}
            >
                <Select>
                    <Option value="">Chọn Phường Xã</Option>
                    {phuongData.map(({full_name, id}) => (
                        <Option key={id} value={id}>{full_name}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{required: true, message: 'Hãy nhập số điện thoại!'}]}
            >
                <Input style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                name="date-picker"
                label="Ngày sinh"
                rules={[{required: true, message: 'Hãy chọn ngày sinh!'}]}
            >
                <DatePicker/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 6, span: 16}}>
                <Button className="submit" type="primary" htmlType="submit">
                    Đăng ký
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
