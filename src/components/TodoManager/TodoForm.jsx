import React, { useState, useEffect } from 'react';
import { Input, Button, Space, Form, message } from 'antd';

const TodoForm = ({ onEditIndex, onSubmit, tasks }) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    if (onEditIndex !== null) {
      form.setFieldsValue({
        todo: tasks[onEditIndex]?.todo,
      });
    }
  }, [onEditIndex, tasks, form]);

  // Handle Add Task Function
  const HandleTodoSubmit = (values) => {
    onSubmit(values, onEditIndex);

    form.resetFields();
  };

  return (
    <Form form={form} onFinish={HandleTodoSubmit}>
      <Space style={{ width: '100%' }}>
        <Form.Item
          style={{ flex: 1, marginBottom: 0 }}
          name="todo"
          rules={[{ required: true, message: 'Please enter a todo' }]}
        >
          <Input placeholder="Enter your todo" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit">
            {onEditIndex != null ? 'Update' : 'Add Task'}
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
export default TodoForm;
