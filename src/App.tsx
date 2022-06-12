import React, { useState } from "react";
import styled from "@emotion/styled";
import { TodoCreationForm } from "./components/TodoCreationForm";
import { TodoList } from "./components/TodoList";
import { Todo } from "./model";

const Container = styled.div`
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2f74c0;
  font-family: cursive;
`;

const StyledHeading = styled.span`
  text-transform: uppercase;
  font-size: 40px;
  margin: 30px 0;
  color: white;
  z-index: 1;
  text-align: center;

  @media (max-width: 800px) {
    margin: 15px 0;
    font-size: 35px;
  }
`;

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = React.useCallback((data: Omit<Todo, "id">) => {
    setTodos((currentState) => [...currentState, { ...data, id: Date.now() }]);
  }, []);

  const handleListItemDelete = React.useCallback((id: number) => {
    setTodos((currentState) => currentState.filter((todo) => todo.id !== id));
  }, []);

  console.log("App Rendered");

  return (
    <Container>
      <StyledHeading>Tasks</StyledHeading>
      <TodoCreationForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleListItemDelete} />
    </Container>
  );
};

export default App;
