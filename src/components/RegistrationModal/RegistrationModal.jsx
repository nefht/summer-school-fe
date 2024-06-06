import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './RegistrationModal.module.css';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Radio, DatePicker, Upload, Row, Col } from 'antd';
import {
  CloseOutlined,
  UserOutlined,
  MailOutlined,
  BankOutlined,
  EditOutlined,
} from '@ant-design/icons';
import useMessage from '../../hooks/useMessage';

import logoName from '/images/logo-name.svg';
import homeDecor from '/images/home-decor.svg';
import { postRegistration } from '../../apis/registrations';
import LoadingSpin from '../LoadingSpin';

const cx = classnames.bind(styles);

const { TextArea } = Input;

function RegistrationModal({ open = false, setOpen }) {
  const { messageApi, contextHolder } = useMessage();

  useEffect(() => {
    if (open) {
      // Disable body scroll khi mở modal
      document.body.style.overflow = 'hidden';
    } else {
      // Enable body scroll khi đóng modal
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const [data, setData] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    targetGroup: '',
    schoolOrCompany: '',
    knowledgeLevel: '',
    expectation: '',
  });

  const handleChangeForm = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation({
    mutationFn: async () => {
      try {
        const response = await postRegistration(data);
        if (response.status === 201 || response.status === 200) {
          messageApi.success(
            'Bạn đã đăng ký học thành công, vui lòng kiểm tra email để xác nhận đăng ký học.',
          );
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        } else {
          messageApi.error('Đăng ký thất bại.');
        }
      } catch (error) {
        console.log('Registration failed:', error);
        messageApi.error('Registration failed. Please try again later.');
      }
    },
  });

  console.log(data);

  return (
    <>
      {contextHolder}
      {handleSubmit.isPending && <LoadingSpin />}
      {open && (
        <div className={cx('background')}>
          <div className={cx('modal')}>
            <CloseOutlined
              className={cx('close-icon')}
              onClick={() => setOpen(false)}
            />
            <img className={cx('decoration-left')} src={homeDecor} alt="" />
            <img className={cx('decoration-right')} src={homeDecor} alt="" />
            <div className={cx('modal-header')}>
              <img className={cx('logo')} src={logoName} alt="" />
              <span className={cx('title')}>ĐĂNG KÝ HỌC HÈ</span>
            </div>
            <Form
              layout="vertical"
              name="normal_login"
              className={cx('form')}
              initialValues={{
                remember: true,
              }}
            >
              <div className={cx('normal-text')}>Họ và tên</div>
              <Form.Item
                className={cx('form-item')}
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Họ và tên của bạn!',
                  },
                ]}
              >
                <Input
                  className={cx('input')}
                  name="name"
                  prefix={<UserOutlined className={cx('icon')} />}
                  placeholder="Họ và tên"
                  onChange={handleChangeForm}
                />
              </Form.Item>

              <div className={cx('normal-text')}>Giới tính</div>
              <Form.Item
                className={cx('form-item')}
                name="gender"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn giới tính của bạn!',
                  },
                ]}
              >
                <Radio.Group
                  buttonStyle="solid"
                  name="gender"
                  onChange={handleChangeForm}
                >
                  <Radio.Button className={cx('radio-btn')} value="male">
                    Nam
                  </Radio.Button>
                  <Radio.Button className={cx('radio-btn')} value="female">
                    Nữ
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              <div className={cx('normal-text')}>Ngày sinh</div>
              <Form.Item
                className={cx('form-item')}
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập ngày sinh của bạn!',
                  },
                ]}
              >
                <DatePicker
                  className={cx('input')}
                  format={'DD/MM/YYYY'}
                  name="dateOfBirth"
                  placeholder="Ngày sinh"
                  onChange={(dateString) => {
                    handleChangeForm({
                      target: {
                        name: 'dateOfBirth',
                        value: dateString,
                      },
                    });
                  }}
                />
              </Form.Item>

              <div className={cx('normal-text')}>Email</div>
              <Form.Item
                className={cx('form-item')}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ Email của bạn!',
                  },
                ]}
              >
                <Input
                  className={cx('input')}
                  name="email"
                  prefix={<MailOutlined className={cx('icon')} />}
                  type="email"
                  placeholder="Email"
                  onChange={handleChangeForm}
                />
              </Form.Item>

              <div className={cx('normal-text')}>Đối tượng</div>
              <Form.Item
                className={cx('form-item')}
                name="targetGroup"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn đối tượng đăng ký!',
                  },
                ]}
              >
                <Radio.Group
                  buttonStyle="solid"
                  name="targetGroup"
                  onChange={handleChangeForm}
                >
                  <Radio.Button className={cx('radio-btn')} value="pupil">
                    Học sinh
                  </Radio.Button>
                  <Radio.Button className={cx('radio-btn')} value="student">
                    Sinh viên
                  </Radio.Button>
                  <Radio.Button
                    className={cx('radio-btn')}
                    value="working_person"
                  >
                    Người đi làm
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              <div className={cx('normal-text')}>Trường học/Công ty</div>
              <Form.Item
                className={cx('form-item')}
                name="schoolOrCompany"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường học/công ty của bạn!',
                  },
                ]}
              >
                <Input
                  className={cx('input')}
                  name="schoolOrCompany"
                  prefix={<BankOutlined className={cx('icon')} />}
                  placeholder="Trường học/công ty của bạn"
                  onChange={handleChangeForm}
                />
              </Form.Item>

              <div className={cx('normal-text')}>
                Hiểu biết của bạn về chủ đề{' '}
                <span className={cx('topic')}>Generative AI?</span>
              </div>
              <Form.Item
                className={cx('form-item')}
                name="knowledgeLevel"
                rules={[
                  {
                    required: true,
                    message:
                      'Vui lòng chọn mức độ hiểu biết của bạn về chủ đề!',
                  },
                ]}
              >
                <Radio.Group
                  buttonStyle="solid"
                  name="knowledgeLevel"
                  onChange={handleChangeForm}
                >
                  <Radio.Button className={cx('radio-btn')} value="1">
                    Chưa biết gì
                  </Radio.Button>
                  <Radio.Button className={cx('radio-btn')} value="2">
                    Tương đối hiểu biết
                  </Radio.Button>
                  <Radio.Button className={cx('radio-btn')} value="3">
                    Hiểu biết
                  </Radio.Button>
                  <Radio.Button className={cx('radio-btn')} value="4">
                    Chuyên gia
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              <div className={cx('normal-text')}>
                Bạn mong muốn thu hoạch được gì khi tham gia Summer School?
              </div>
              <Form.Item className={cx('form-item')} name="expectation">
                <TextArea
                  name="expectation"
                  placeholder="Nhập mong muốn của bạn tại đây..."
                  autoSize={{
                    minRows: 4,
                    maxRows: 6,
                  }}
                  prefix={<EditOutlined className={cx('icon')} />}
                  onChange={handleChangeForm}
                />
              </Form.Item>

              <Button
                htmlType="submit"
                className={cx('form-btn')}
                type="primary"
                disabled={handleSubmit.isPending}
                onClick={() => handleSubmit.mutate({ data })}
              >
                Xác nhận
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationModal;
