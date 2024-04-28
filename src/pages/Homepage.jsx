import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Form, Input } from 'antd';
import Navbar from '../components/Navbar';
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import restaurantsData from '../data/restaurants.json';

const Homepage = () => {
  const [restaurants, setRestaurants] = useState(() => {
    const storedRestaurants = localStorage.getItem('restaurants');
    return storedRestaurants ? JSON.parse(storedRestaurants) : restaurantsData;
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  const handleAdd = () => {
    setIsModalVisible(true);
    setSelectedRestaurant(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setSelectedRestaurant(record);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    setSelectedRestaurant(record);
    setIsDeleteModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false);
    form.resetFields();
  };

  const handleDeleteConfirm = () => {
    const updatedRestaurants = restaurants.filter((r) => r.id !== selectedRestaurant.id);
    setRestaurants(updatedRestaurants);
    setIsDeleteModalVisible(false);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (selectedRestaurant) {
          const updatedRestaurants = restaurants.map((r) =>
            r.id === selectedRestaurant.id ? { ...r, ...values } : r
          );
          setRestaurants(updatedRestaurants);
        } else {
          const newRestaurant = { id: restaurants.length + 1, ...values };
          setRestaurants([...restaurants, newRestaurant]);
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Pincode',
      dataIndex: 'pincode',
      key: 'pincode',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <span>
          <MdOutlineModeEdit type="primary" style={{cursor: "pointer"}} onClick={() => handleEdit(record)}>Edit</MdOutlineModeEdit>
        </span>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <span>
          <MdOutlineDelete type="danger" style={{cursor: "pointer"}} onClick={() => handleDelete(record)}>Delete</MdOutlineDelete>
        </span>
      ),
    },
  ];

  const inputStyle = {
    width: '100%',
    fontSize: '12px',
    backgroundColor: '#d8e6db',
    color: 'black',
    flex: 1,
  }; 

  return (
    <div className='landing-page'>
      <Navbar className='navbar'/>
      <div className='main-container'>
        <div className='button-primary'>
        <Button type="primary" onClick={handleAdd}>
          Add +
        </Button>
        </div>
        <div className='container-table'>
          <Table className='table' dataSource={restaurants} columns={columns} pagination={false} />
          <Modal
          title={selectedRestaurant ? 'Editing Information' : 'Add Restaurant'}
          visible={isModalVisible}
          onCancel={handleModalCancel}
          onOk={handleModalOk}
          width={1100}
          footer={[
            <Button key="cancel" onClick={handleModalCancel} style={{ color: 'grey' }}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleModalOk}>
              {selectedRestaurant ? 'Save' : 'Add'}
            </Button>,
          ]}
        >
          <Form form={form} layout="horizontal">
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
              <Form.Item name="name" style={{ flex: 1 }}>
                <Input placeholder="Name" style={inputStyle} />
              </Form.Item>
              <Form.Item name="address" style={{ flex: 1 }}>
                <Input placeholder="Address" style={inputStyle} />
              </Form.Item>
              <Form.Item name="pincode" style={{ flex: 1 }}>
                <Input placeholder="Pincode" style={inputStyle} />
              </Form.Item>
              <Form.Item name="mobileNumber" style={{ flex: 1 }}>
                <Input placeholder="Mobile Number" style={inputStyle} />
              </Form.Item>
              <Form.Item name="email" style={{ flex: 1 }}>
                <Input placeholder="Email" style={inputStyle} />
              </Form.Item>
              <Form.Item name="website" style={{ flex: 1 }}>
                <Input placeholder="Website" style={inputStyle} />
              </Form.Item>
            </div>
          </Form>
        </Modal>
        <Modal
          title="ARE YOU SURE TO DELETE INFORMATION"
          visible={isDeleteModalVisible}
          onCancel={handleModalCancel}
          width={1100} // Increased width
          footer={[
            <Button key="cancel" onClick={handleModalCancel} style={{ color: 'grey' }}>
              Cancel
            </Button>,
            <Button key="delete" type="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>,
          ]}
        >
          {selectedRestaurant && (
            <Form layout="vertical">
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>

                <Input value={selectedRestaurant.id} disabled style={inputStyle} />

                <Input value={selectedRestaurant.name} disabled style={inputStyle} />
                <Input value={selectedRestaurant.address} disabled style={inputStyle} />
                <Input value={selectedRestaurant.pincode} disabled style={inputStyle} />
                <Input value={selectedRestaurant.mobileNumber} disabled style={inputStyle} />
                <Input value={selectedRestaurant.email} disabled style={inputStyle} />
                <Input value={selectedRestaurant.website} disabled style={inputStyle} />
              </div>
            </Form>
          )}
        </Modal>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
