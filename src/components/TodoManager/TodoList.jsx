import React from 'react';
import { Card, Tag, Space } from 'antd';
import { EditOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';

const TodoList = ({ tasks, onDelete, onEdit, onComplete }) => {
  // console.log(tasks);
  // Handle Delete Function
  const HandleDelete = (index) => {
    console.log(index);
    onDelete(index);
  };

  // Handle Edit Function
  const HandleEdit = (index) => {
    onEdit(index);
  };

  // Handle Edit Function
  const HandleComplete = (index) => {
    onComplete(index);
  };

  return (
    <Space
      orientation="vertical"
      style={{ width: '100%', marginTop: 20 }}
      size={8}
    >
      {tasks.map((item, index) => (
        <Card key={index} size="small">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* LEFT: Todo text */}
            <span
              style={{
                textDecoration: item.status === 1 ? 'line-through' : 'none',
                textTransform: 'capitalize',
              }}
            >
              {item.todo}
            </span>

            {/* RIGHT: Action icons */}
            <Space size={14}>
              {/* Hide Check and Edit Icon on Task Completed*/}
              {item.status === 0 && (
                <>
                  <CheckOutlined
                    onClick={() => HandleComplete(index)}
                    style={{ color: 'green', cursor: 'pointer' }}
                  />
                  <EditOutlined
                    onClick={() => HandleEdit(index)}
                    style={{ color: '#1677ff', cursor: 'pointer' }}
                  />
                </>
              )}
              <DeleteOutlined
                onClick={() => HandleDelete(index)}
                style={{ color: '#ff4d4f', cursor: 'pointer' }}
              />
              <Tag
                color={item.status == 0 ? 'processing' : 'success'}
                variant="solid"
              >
                {item.status == 0 ? 'Pending' : 'Completed'}
              </Tag>
            </Space>
          </div>
        </Card>
      ))}
    </Space>
  );
};
export default TodoList;
