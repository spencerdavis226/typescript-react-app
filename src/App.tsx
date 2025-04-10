import React, { useCallback, useRef } from 'react';
import './App.css';
import { useTodos } from './useTodos';

const Heading = ({ title }: { title: string }) => {
  return <h2>{title}</h2>;
};

const Box = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        padding: '1rem',
        fontWeight: 'bold',
      }}
    >
      {children}
    </div>
  );
};

function App() {
  const { todos, addTodo, removeTodo } = useTodos([
    { id: 0, text: 'Hey there!', done: false },
  ]);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = '';
    }
  }, [addTodo]);

  function UL<T>({
    items,
    render,
  }: {
    items: T[];
    render: (item: T) => React.ReactNode;
  }) {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{render(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>

      <Heading title="Todos" />
      <UL
        items={todos}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </>
        )}
      />

      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
