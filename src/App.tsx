import React, { useCallback, useRef } from 'react';
import './App.css';
import { useTodos, useAddTodo, useRemoveTodo, TodosProvider } from './useTodos';

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

function App() {
  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = '';
    }
  }, [addTodo]);

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

const JustShowTodos = () => {
  const todos = useTodos();
  return <UL items={todos} render={(todo) => <>{todo.text}</>} />;
};

const AppWrapper = () => {
  return (
    <TodosProvider
      initialTodos={[{ id: 0, text: 'Hey there useContext!', done: false }]}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%',
        }}
      >
        <App />
        <JustShowTodos />
      </div>
    </TodosProvider>
  );
};

export default AppWrapper;
