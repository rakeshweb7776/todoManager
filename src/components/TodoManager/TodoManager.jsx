import React, { useState, useEffect } from 'react';
import { Card, Button, message } from 'antd';
import TodoForm from './TodoForm';
import TodoDateTime from './TodoDateTime';
import TodoList from './TodoList';
import { DownloadOutlined } from '@ant-design/icons';

const TodoManager = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todoData');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(tasks));
  }, [tasks]);

  const [editingIndex, setEditingIndex] = useState(null);

  const HandleAddTask = (taskValue, onEditIndex) => {
    /* Make Proper Data */

    const exists = tasks.some((task) => task.todo === taskValue.todo);
    if (exists) {
      message.error('Task already exists');
      setEditingIndex(null);
      return;
    }

    if (onEditIndex != null) {
      /* If Edited Task Submit Here */
      setTasks((prev) =>
        prev.map((task, i) =>
          i === onEditIndex ? { ...task, todo: taskValue.todo } : task
        )
      );
      setEditingIndex(null);
    } else {
      /* If New Task Submit Here */
      setTasks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          todo: taskValue.todo,
          status: 0,
        },
      ]);
      message.success('Task added successfully');
    }
  };

  localStorage.setItem('todoData', JSON.stringify(tasks));

  const HandleDeleteTask = (deleteIndex) => {
    const updatedTask = tasks.filter((_, index) => index !== deleteIndex);
    setTasks(updatedTask);
    setEditingIndex(null);
    message.success('Task deleted successfully');
  };

  const HandleEditTask = (index) => {
    setEditingIndex(index);
  };

  const HandleCompletedTask = (index) => {
    setTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, status: 1 } : task))
    );
    message.success('Task completely successfully');
  };

  const HandleClearAllTask = () => {
    setTasks([]);
    setEditingIndex(null);
    message.success('All task cleared successfully');
  };

  const HandleLoadDummyTodo = () => {
    const dummyTodos = [
      {
        id: 1,
        todo: 'Do something nice for someone you care about',
        status: 0,
      },
      { id: 2, todo: 'Memorize a poem', status: 0 },
      { id: 3, todo: 'Watch a classic movie', status: 0 },
      { id: 4, todo: 'Go for a morning walk', status: 0 },
      { id: 5, todo: 'Read 20 pages of a book', status: 0 },
      { id: 6, todo: 'Practice coding for one hour', status: 0 },
      { id: 7, todo: 'Clean your workspace', status: 0 },
      { id: 8, todo: 'Drink 2 liters of water', status: 0 },
      { id: 9, todo: 'Plan tasks for tomorrow', status: 0 },
      { id: 10, todo: 'Go to bed before midnight', status: 0 },
    ];

    setTasks(dummyTodos); // ✅ UI updates immediately
  };

  return (
    <>
      <Button
        onClick={HandleLoadDummyTodo}
        color="primary"
        variant="outlined"
        style={{ fontWeight: 700, margin: 15 }}
      >
        <DownloadOutlined />
        Load Dummy Task
      </Button>
      <div style={{ maxWidth: 800, margin: '22px auto' }}>
        <Card
          title={
            <div
              style={{ textAlign: 'center', paddingBottom: 10, paddingTop: 10 }}
            >
              {/* Card Main Title */}
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>
                My Todo List
              </div>

              {/* Live Date & Time Display */}
              <Button
                color="primary"
                variant="outlined"
                style={{ fontWeight: 700 }}
              >
                <TodoDateTime />
              </Button>
            </div>
          }
        >
          <TodoForm
            onEditIndex={editingIndex}
            onSubmit={HandleAddTask}
            tasks={tasks}
          />

          <TodoList
            onDelete={HandleDeleteTask}
            onEdit={HandleEditTask}
            tasks={tasks}
            onComplete={HandleCompletedTask}
          />

          {/* ================================
            Clear All Button (UI only)
           ================================ */}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Button type="primary" danger onClick={HandleClearAllTask}>
              Clear All
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TodoManager;
