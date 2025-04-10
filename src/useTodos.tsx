import { useCallback, useReducer, useContext, createContext } from 'react';

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

type UseTodosManagerResults = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResults>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

export function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer(
    (state: Todo[], action: ActionType): Todo[] => {
      switch (action.type) {
        case 'ADD':
          return [
            ...state,
            {
              id: state.length,
              text: action.text,
              done: false,
            },
          ];
        case 'REMOVE':
          return state.filter(({ id }) => id !== action.id);
        default:
          throw new Error();
      }
    },
    initialTodos
  );

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: 'ADD',
      text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  }, []);

  return { todos, addTodo, removeTodo };
}

export const TodosProvider: React.FC<
  React.PropsWithChildren<{ initialTodos: Todo[] }>
> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodo = (): UseTodosManagerResults['addTodo'] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResults['removeTodo'] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};
